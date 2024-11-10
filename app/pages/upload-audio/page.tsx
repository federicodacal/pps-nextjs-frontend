"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AudioWavePlayer from "../../components/audio/AudioPlayerWave";

const UploadPage: React.FC = () => {
  const router = useRouter();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioData, setAudioData] = useState({
    name: "",
    bpm: "",
    tone: "",
    duration: "",
    genre: "",
    category: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAudioData({ ...audioData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", audioFile as Blob);
    formData.append("name", audioData.name);
    formData.append("bpm", audioData.bpm);
    formData.append("tone", audioData.tone);
    formData.append("duration", audioData.duration);
    formData.append("genre", audioData.genre);
    formData.append("category", audioData.category);

    await fetch("/endpoint_pruebas", {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    router.push("/confirm");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Carga de Audio</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
        <input type="file" accept="audio/*" onChange={handleFileChange} required />
        <input type="text" name="name" placeholder="Nombre de audio" onChange={handleInputChange} required />
        <input type="text" name="bpm" placeholder="BPM" onChange={handleInputChange} required />
        <input type="text" name="tone" placeholder="Tonalidad" onChange={handleInputChange} required />
        <input type="text" name="duration" placeholder="Duración" onChange={handleInputChange} required />
        <input type="text" name="genre" placeholder="Género" onChange={handleInputChange} required />
        <input type="text" name="category" placeholder="Categoría" onChange={handleInputChange} required />

        <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
          Confirmar
        </button>
      </form>

      <div className="mt-6 w-full max-w-lg">
        <AudioWavePlayer audioFile={audioFile} />
      </div>
    </div>
  );
};

export default UploadPage;