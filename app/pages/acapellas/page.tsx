'use client'

import { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/searchbar/SearchBar';
import AudioRow from '../../components/audio/Audio';
import { Audio } from '../../types/audio';

export default function Acapellas() {
  const [searchTerm, setSearchTerm] = useState('');

  const audios: Audio[] = [
    { 
      id: '1',
      name: 'Audio 1', 
      description: 'Audio 1',
      creator: 'Creador 1', 
      bpm: 120, tone: 'C', 
      length: 320, 
      genre: 'Rock', 
      category: 'Instrumental' 
    },
    { 
      id: '2',
      name: 'Audio 2', 
      description: 'Audio 2',
      creator: 'Creador 2', 
      bpm: 89, tone: 'D', 
      length: 320, 
      genre: 'Pop', 
      category: 'Instrumental' 
    },
    { 
      id: '3',
      name: 'Audio 3', 
      description: 'Audio 3',
      creator: 'Creador 3', 
      bpm: 100, tone: 'F', 
      length: 280, 
      genre: 'Tango', 
      category: 'Instrumental' 
    },
    
    // Agrega más audios según necesites
  ];

  const filteredAudios = audios.filter((audio) =>
    Object.values(audio).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-black text-violet-200 flex flex-col items-center w-full">
      <Header title='Listado de Acapellas'/>
      <main className="w-full max-w-4xl px-4 py-4">
        <SearchBar />
        <div className="space-y-4">
          {filteredAudios.map((audio, index) => (
            <AudioRow key={index} audio={audio} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
