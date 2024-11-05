import React from 'react';

interface AudioItemProps {
  audio: {
    id: number;
    name: string;
    creator: string;
    tone: string;
    bpm: number;
    duration: string;
    favorite: boolean;
  };
  toggleFavorite: (id: number) => void;
}

const AudioItem: React.FC<AudioItemProps> = ({ audio, toggleFavorite }) => {
  return (
    <li className="audio-item">
      <div>
        <p>Nombre: {audio.name}</p>
        <p>Creador: {audio.creator}</p>
        <p>Tonalidad: {audio.tone}</p>
        <p>BPM: {audio.bpm}</p>
        <p>Duración: {audio.duration}</p>
      </div>
      <button onClick={() => toggleFavorite(audio.id)}>
        {audio.favorite ? 'Quitar de Favoritos' : 'Favoritos'}
      </button>
      <button onClick={() => alert(`Descargando ${audio.name}`)}>Descargar</button>
    </li>
  );
};

export default AudioItem;