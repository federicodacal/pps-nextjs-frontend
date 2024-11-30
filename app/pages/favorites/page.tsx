'use client'

import { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/searchbar/SearchBar';
import AudioRow from '../../components/audio/Audio';
import { AUDIOS }  from '../../mocks/Audio';

export default function Favorites() {
  const [searchTerm, setSearchTerm] = useState('');

  const audios = AUDIOS;

  const filteredAudios = audios.filter((audio) =>
    Object.values(audio).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-black text-violet-200 flex flex-col items-center w-full">
      <Header title='Listado de Favoritos'/>
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
