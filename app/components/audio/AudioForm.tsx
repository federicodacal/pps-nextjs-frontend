"use client";

import { useState } from "react";
import { createAudio } from "@/app/services/audio-service";
import { useRouter } from "next/navigation";
import AudioWavePlayer from "../../components/audio/AudioPlayerWave";
import { useWavesurfer } from "@wavesurfer/react";

const AudioForm = () => {
  const router = useRouter();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioData, setAudioData] = useState({
    ID: "",
    creator_ID: "",
    audio_name: "",
    state: "",
    category: "",
    genre: "",
    BPM: "",
    tone: "",
    length: "",
    size: "",
    description: "",
    state_item: "",
    price: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAudioData({ ...audioData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile) return alert("Por favor, selecciona un archivo de audio");

    const formData = new FormData();
    Object.keys(audioData).forEach((key) =>
      formData.append(key, audioData[key as keyof typeof audioData])
    );
    formData.append("file", audioFile);

    try {
      const response = await createAudio(formData);
      console.log("Audio creado:", response.data);
      router.push("/home");
    } catch (error) {
      console.error("Error al crear el audio:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-5 rounded-lg w-full max-w-lg mx-auto text-white"
      >
        {/* Campos para los datos del audio */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="ID" className="block mb-2 text-sm font-medium">
            ID
          </label>
          <input
            type="text"
            name="ID"
            onChange={handleInputChange}
            placeholder="Ingrese el ID del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="creator_ID"
            className="block mb-2 text-sm font-medium"
          >
            Creator ID
          </label>
          <input
            type="text"
            name="creator_ID"
            onChange={handleInputChange}
            placeholder="Ingrese el ID del creador"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="item_ID" className="block mb-2 text-sm font-medium">
            Item ID
          </label>
          <input
            type="text"
            name="item_ID"
            onChange={handleInputChange}
            placeholder="Ingrese el ID del creador"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Otros campos de audio */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="audio_name"
            className="block mb-2 text-sm font-medium"
          >
            Nombre del Audio
          </label>
          <input
            type="text"
            name="audio_name"
            onChange={handleInputChange}
            placeholder="Nombre del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="state" className="block mb-2 text-sm font-medium">
            Estado
          </label>
          <input
            type="text"
            name="state"
            onChange={handleInputChange}
            placeholder="Estado del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="state_item"
            className="block mb-2 text-sm font-medium"
          >
            Estado
          </label>
          <input
            type="text"
            name="state_item"
            onChange={handleInputChange}
            placeholder="Estado del item"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="category" className="block mb-2 text-sm font-medium">
            Categoría
          </label>
          <input
            type="text"
            name="category"
            onChange={handleInputChange}
            placeholder="Categoría del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="genre" className="block mb-2 text-sm font-medium">
            Género
          </label>
          <input
            type="text"
            name="genre"
            onChange={handleInputChange}
            placeholder="Género del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="size" className="block mb-2 text-sm font-medium">
            Tamaño
          </label>
          <input
            type="number"
            name="size"
            onChange={handleInputChange}
            placeholder="Tamaño del archivo"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="BPM" className="block mb-2 text-sm font-medium">
            BPM
          </label>
          <input
            type="number"
            name="BPM"
            onChange={handleInputChange}
            placeholder="BPM del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="tone" className="block mb-2 text-sm font-medium">
            Tono
          </label>
          <input
            type="number"
            name="tone"
            onChange={handleInputChange}
            placeholder="Tono del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="length" className="block mb-2 text-sm font-medium">
            Duración
          </label>
          <input
            type="number"
            name="length"
            onChange={handleInputChange}
            placeholder="Duración del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="price" className="block mb-2 text-sm font-medium">
            Duración
          </label>
          <input
            type="number"
            name="price"
            onChange={handleInputChange}
            placeholder="$ Precio del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium"
          >
            Descripción
          </label>
          <textarea
            name="description"
            onChange={handleInputChange}
            placeholder="Descripción del audio"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="file" className="block mb-2 text-sm font-medium">
            Archivo de Audio
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cargar Audio
        </button>
      </form>
      <div>
        <div className="mt-6 w-full max-w-lg">
          <AudioWavePlayer audioFile={audioFile} />
        </div>
      </div>
    </>
  );
};

export default AudioForm;
