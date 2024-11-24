'use client'
import React, { useEffect, useState } from 'react';
import AudioCard from '../audio/AudioCard';
import { getAllAudios } from '@/app/services/audio-service';



const AudioList: React.FC = () => {
  const [audios, setAudios] = useState<any[]>([]); // any[] en lugar de audio[] para probar mapeo

  useEffect(() => {
    // Obtener los audios desde la API al cargar el componente
    const fetchAudios = async () => {
      try {
        const response = await getAllAudios();
        console.log("Audios obtenidos de la API:", response.data); // Verifica que los datos de la API estén bien
        setAudios(response.data); // Guardamos los audios de la API en el estado
      } catch (error) {
        console.error("Error al obtener los audios:", error);
      }
    };

    fetchAudios();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {audios.map((audio, index) => (
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
  );
};

export default AudioList;