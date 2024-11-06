'use client';
import React, { useEffect, useState } from 'react';
import AudioCard from '../audio/AudioCard';
import { getAllAudios } from '@/app/services/audio-service';
import { Audio } from '@/app/types/audio';

// Audios hardcodeados
const hardcodedAudios = [
  {
    audio_name: 'Sample Audio 1',
    creator_ID: 'Creator A',
    BPM: 120,
    tone: 'C',
    genre: 'Pop',
    category: 'Sample',
    length: '3:30',
    file_url: '../samples/sample1.wav', // Este es un archivo local, usa una ruta válida en tu proyecto
  },
  {
    audio_name: 'Sample Audio 2',
    creator_ID: 'Creator A',
    BPM: 120,
    tone: 'C',
    genre: 'Pop',
    category: 'Sample',
    length: '3:30',
    file_url: '../samples/sample2.wav', // Este es un archivo local, usa una ruta válida en tu proyecto
  },
  // Agrega más audios mockeados aquí si lo deseas
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allAudios.map((audio, index) => (
        <AudioCard
        key={index}
        name={audio.audio_name} 
        creator={audio.creator_ID} 
        bpm={audio.BPM} 
        tone={audio.tone.toString()} 
        genre={audio.genre} 
        category={audio.category} 
        duration={audio.length} 
        audioUrl={audio.file_url}
        onAddToFavorites={() => console.log(`${audio.audio_name} added to favorites`)}
        onAddToCart={() => console.log(`${audio.audio_name} added to cart`)}
        />
      ))}
    </div>
  );
};


export default AudioList;