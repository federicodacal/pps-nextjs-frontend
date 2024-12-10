'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
  BsPlusCircleFill,
  BsHeartFill,
  BsHeart,
} from "react-icons/bs";

interface AudioPlayerProps {
  audioUrl: string; // URL del audio recibido desde la base de datos
  onAddToCart: () => void;
  onAddToFavorites: () => void;
  full: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  onAddToCart,
  onAddToFavorites,
  full
}) => {
  const waveformRef = useRef<HTMLDivElement>(null); // Contenedor para la onda
  const waveSurferRef = useRef<WaveSurfer | null>(null); // Referencia a WaveSurfer
  const [isPlaying, setIsPlaying] = useState(false); // Estado del reproductor

  useEffect(() => {
    // Configurar Wavesurfer al montar el componente
    if (waveformRef.current && !waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#A78BFA', // Color de la onda
        progressColor: '#7C3AED', // Color de progreso
        cursorColor: '#9333EA', // Color del cursor
        barWidth: 2, // Grosor de las barras
        height: 80,
      });

      waveSurferRef.current.load(audioUrl); // Cargar el audio
    }

    return () => {
      // Limpiar Wavesurfer al desmont
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <div className="bg-transparent p-6  shadow-md text-lime-100">
      <div className="mb-4">
        {/* Contenedor para la onda de audio */}
        <div ref={waveformRef} className=" overflow-hidden"></div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={togglePlay}
          className="px-4 py-4 bg-purple-600 hover:bg-purple-700 text-lime-100 rounded-full shadow-md transition-all"
        >
          {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
        </button>

        {
          full ? <div>
            <button
              onClick={onAddToCart}
              className="px-4 py-4 bg-purple-600 hover:bg-purple-700 text-lime-100 rounded-full shadow-md transition-all"
            >
              <BsPlusCircleFill />
            </button>
            <button
              onClick={onAddToFavorites}
              className="px-4 py-4 bg-purple-600 hover:bg-purple-700 text-lime-100 rounded-full shadow-md transition-all"
            >
              <BsHeartFill />
            </button>
          </div> : <></>


        }


      </div>
    </div>
  );
};

export default AudioPlayer;