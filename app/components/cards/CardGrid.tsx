'use client'
import React, { useEffect, useState } from 'react';
import AudioCard from '../audio/AudioCard';
import { getAllAudios } from '@/app/services/audio-service';

const hardcodedAudios = [
  {
    id: "ejemplo_01",
    name: 'Sample Audio 1',
    creator: 'Creator A',
    bpm: 120,
    tone: 'C',
    genre: 'Pop',
    category: 'Sample',
    duration: '3:30',
    audioUrl: '../samples/sample1.wav',
  },
  {
    id: "nuevo_id_audio_55",
    name: 'Sample Audio 2',
    creator: 'Creator A',
    bpm: 120,
    tone: 'C',
    genre: 'Pop',
    category: 'Sample',
    duration: '3:30',
    audioUrl: '../samples/sample2.wav',
  },
  // Puedes agregar más audios mockeados aquí
];

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

  // Combina los audios de la API con los hardcodeados
  const allAudios = [...audios, ...hardcodedAudios];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 m-2">
      {audios.map((audio,index) => (
        <AudioCard
        key={index}
          {...audio}
          onAddToFavorites={(id:number) => console.log(`${id} added to favorites`)}
          onAddToCart={(id:number) => console.log(`${id} added to cart`)}
        />
      ))}
    </div>
  );
};

export default AudioList;