"use client";

import type { Metadata } from "next";
import storage from "local-storage-fallback";
import { Audio } from "../../types/audio";
import AudioDetail from "../../components/audio/AudioItem";
import { getAudioById } from "@/app/services/audio-service";
import React, { useEffect, useState } from 'react';

const retrieveAudios = () => {
  let audiosIDs = storage.getItem("selected_audios");

  if (audiosIDs == null) {
    audiosIDs = "";
  }

  return audiosIDs.split(",");
};

const getAudios = async (audioIDs: string[]) => {
  let audios: Audio[] = [];

  audioIDs.forEach(async (id) => {
    let response = await getAudioById(id);
    audios.push(response.data);
   
  });
};

export default function Cart() {
  const [audios, setAudios] = useState<any[]>([]); //

  useEffect(() => {
    // Obtener los audios desde la API al cargar el componente
    const fetchAudios = async () => {
      let audios: Audio[] = [];
      const audioIDs = retrieveAudios();
      
      try {
        audioIDs.forEach(async (id) => {
          let response = await getAudioById(id);
          audios.push(response.data);
         
        });

        console.log(audios)

        setAudios(audios); // Guardamos los audios de la API en el estado
      } catch (error) {
        console.error("Error al obtener los audios:", error);
      }
    };

    fetchAudios();
  }, []); // Solo se ejecuta una vez al montar el componente

  const selectedAudios = audios

  return (
    <main className="flex flex-col items-center p-24">
      <span className="text-5xl">Carrito</span>
      <div>
        <ul>
          {selectedAudios.map((audio) => (
            <AudioDetail
              key={audio.id}
              audio={audio}
              toggleFavorite={()=>{}}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
