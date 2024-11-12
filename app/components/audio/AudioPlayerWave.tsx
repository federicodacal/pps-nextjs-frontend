// components/AudioWavePlayer.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";

interface AudioWavePlayerProps {
  audioFile: File | null;
}

const AudioWavePlayer: React.FC<AudioWavePlayerProps> = ({ audioFile }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioFile && audioRef.current) {
      const url = URL.createObjectURL(audioFile);
      audioRef.current.src = url;
    }
  }, [audioFile]);

  return (
    <div className="bg-dark p-4 rounded-lg">
      <audio ref={audioRef} controls className="w-full mt-2" />
      <p className="text-primary mt-4">Onda de audio aquí (pendiente de implementación visual)</p>
    </div>
  );
};

export default AudioWavePlayer;
