'use client'

import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/searchbar/SearchBar';
import AudioRow from '../../components/audio/Audio';
import AudioCard from '../../components/audio/AudioCard';
import { AUDIOS } from '../../mocks/Audio';
import { getAllAudios } from '@/app/services/audio-service';
import { Audio } from '@/app/types/audio';


const EffectsPage = () => {
  const [audios, setAudios] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAudios = async () => {
      // const mockData:Audio[] = AUDIOS
      try {
        const response = await getAllAudios();
        console.log("Audios obtenidos de la API:", response.data); // Verifica que los datos de la API estén bien
        setAudios(response.data.filter(filterEffects)); // Guardamos los audios de la API en el estado
      } catch (error) {
        console.error("Error al obtener los audios:", error);
      }
    };
    fetchAudios();
  }, []);

  const filterEffects = (audio:Audio) => {
    return audio.category == "effect"
  }

  const filteredAudios = audios.filter(
    (audio) =>
      audio.audio_name.toLowerCase().includes(search.toLowerCase()) ||
      audio.category.toLowerCase().includes(search.toLowerCase()) ||
      audio.BPM.toString() === search
  );

  return (
    <div className="min-h-screen bg-dark text-lightText p-6">
      <Header title="Listado de efectos"/>

      <input
        type="text"
        placeholder="Buscar por nombre, categoría o BPM..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-md bg-dim text-lightText placeholder-gray-400 focus:outline-none mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
           onAddToFavorites={(id: number) => console.log(`${id} added to favorites`)}
           onAddToCart={(id: number) => console.log(`${id} added to cart`)}
         />
        ))}
      </div>

      {filteredAudios.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No se encontraron resultados.
        </p>
      )}
    </div>
  );
};

export default EffectsPage;
