'use client'
import React from 'react';
import AudioCard from '../audio/AudioCard';

const audios = [
  {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {audios.map((audio, index) => (
        <AudioCard
          {...audio}
          onAddToFavorites={() => console.log(`${audio.name} added to favorites`)}
          onAddToCart={() => console.log(`${audio.name} added to cart`)}
        />
      ))}
    </div>
  );
};

export default AudioList;