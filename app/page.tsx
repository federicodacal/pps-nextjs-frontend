'use client'

import { useEffect, useState } from 'react';
import Carousel from './components/carrousel/Carrousel';
import CardGrid from './components/cards/CardGrid';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { getAllAudios } from '../app/services/audio-service';
import { AudioDB } from '../app/types/audio';
import AudioCard from '../app/components/audio/AudioCard';
import { getCarrousel } from './services/carrousel-service';

/*
const images = [
  { image: "/image_1.jpg" },
  { image: "/image_2.jpg" },
  { image: "/image_3.jpg" },
]; */

const filterAudio = (audios:any[]) => {
  let a: any[] = []

  audios.filter((audio) => {
    if (audio.state == "active" ) a.push(audio)
  })

  return a
}


const Home = () => {
  const [audios, setAudios] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [carouselImages, setCarouselImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchAudios = async () => {
      // const mockData:Audio[] = AUDIOS
      try {
        const response = await getAllAudios();
        console.log("Audios obtenidos de la API:", response.data); // Verifica que los datos de la API estén bien

        setAudios(filterAudio(response.data)); // Guardamos los audios de la API en el estado
      } catch (error) {
        console.error("Error al obtener los audios:", error);
      }
    };

    const fetchCarousel = async () => {
      try {
        const response = await getCarrousel();
        const images = response.data.map((item: any) => ({
          image: item.imgUrl,
          title: item.titulo,
          description: item.descripcion,
        }));
        setCarouselImages(images);
      }
      catch (error) {
        console.error("Error al obtener el carrusel:", error);
      }
    }

    fetchAudios();
    fetchCarousel();
  }, []);

  const filteredAudios = audios.filter(
    (audio) =>
      audio.audio_name.toLowerCase().includes(search.toLowerCase()) ||
      audio.category.toLowerCase().includes(search.toLowerCase()) ||
      audio.genre.toLowerCase().includes(search.toLowerCase()) ||
      audio.description.toLowerCase().includes(search.toLowerCase()) ||
      audio.tone.toString() === search ||
      audio.BPM.toString() === search
  );

  return (
    <div className="min-h-screen  bg-gray-900 text-lightText place-items-center">

      <Header title="AudioLibre" />
      <Carousel data={carouselImages} />

      <div className='max-w-4xl m-auto p-5'>
        <input
          type="text"
          placeholder="Buscar por nombre, categoría o BPM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-md bg-dim text-lightText placeholder-gray-200 focus:outline-none mb-6  border-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAudios.map((audio, index) => (
          <AudioCard
            key={index}
            id={audio.ID}
            name={audio.audio_name}
            creator={audio.creator_ID}
            bpm={audio.BPM}
            tone={audio.tone.toString()}
            genre={audio.genre}
            category={audio.category}
            duration={audio.length}
            audioUrl={audio.file_url}
            onAddToCart={(id) => console.log(`Agregado al carrito: ${id}`)}
            onAddToFavorites={(id) => console.log(`Agregado a favoritos: ${id}`)}
          />
        ))}
      </div>

      {filteredAudios.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No se encontraron resultados.
        </p>
      )}
      <Footer />
    </div>
  );
};

export default Home;
