'use client'

import { useState } from 'react';

type Audio = {
  name: string;
  creator: string;
  duration: string;
  bpm: string;
};

const audios: Audio[] = [
  { name: 'Audio 1', creator: 'Creador 1', duration: '3:15', bpm: '120' },
  { name: 'Audio 2', creator: 'Creador 2', duration: '4:20', bpm: '100' },
  { name: 'Audio 3', creator: 'Creador 3', duration: '2:45', bpm: '130' },
  { name: 'Audio 4', creator: 'Creador 4', duration: '5:10', bpm: '115' },
  { name: 'Audio 5', creator: 'Creador 5', duration: '3:30', bpm: '125' },
];

export default function CardGrid() {
  const [search, setSearch] = useState<string>('');

  const filteredAudios = audios.filter((audio) =>
    audio.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar audio..."
        className="w-full p-2 mb-4 rounded text-gray-900"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAudios.map((audio, index) => (
          <div key={index} className="bg-gradient-to-br from-cardGradientStart to-cardGradientEnd rounded-lg p-4 text-white">
            <h3 className="text-lg font-bold">{audio.name}</h3>
            <p>Creador: {audio.creator}</p>
            <p>Duración: {audio.duration}</p>
            <p>BPM: {audio.bpm}</p>
            <div className="flex justify-between mt-4">
              <button className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">❤️</button>
              <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">⬇️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}