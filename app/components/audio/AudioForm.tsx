"use client";

import { useState, useEffect } from "react";
import { createAudio } from "@/app/services/audio-service";
import { useRouter } from "next/navigation";
import AudioWavePlayer from "../../components/audio/AudioPlayerWave";
import { Audio } from "../../types/audio"
import { getCategories, getGenres } from "@/app/services/genres-and-categories-service";
import { useAuth } from '@/app/contexts/AuthContext';

const newAudio = {
  ID: "",
  creator_ID: "",
  audio_name: "",
  state: "",
  category: "",
  genre: "",
  BPM: 0,
  tone: "",
  length: "",
  size: 0,
  description: "",
  state_item: "",
  price: "",
  file_url: "",
}

const getTones = () => {
  return ["C","C#","D","D#","E","F","G","G#","F","F#","G","G#","A","A#","B","Bb","Ab","Gb","Eb","Db"]
}

const AudioForm = () => {
  const router = useRouter();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioData, setAudioData] = useState<Audio>(newAudio);
  const [genres, setGenres] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tones, setTones] = useState<string[]>(getTones());
  const { creatorId } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudioFile(e.target.files[0]); // Actualiza el estado con el archivo seleccionado
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAudioData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile) return console.log("SELECCIONE AUDIO");

    const formData = new FormData();

    try {
      if (creatorId) {
        // Asignar creatorId directamente al formData antes de enviarlo
        formData.append("creator_ID", creatorId);
        console.log("creatorId: ", creatorId);
      } else {
        const msg = "No hay creator_id, no está validada la sesión del creador";
        console.log(msg);
        throw Error(msg);
      }

      // Añadir todos los demás campos de audioData al FormData
      Object.keys(audioData).forEach((key) => {
        if (key !== "creator_ID") { // Evita agregar creator_ID de nuevo
          let value = String(audioData[key as keyof typeof audioData])
          formData.append(key, value);
        }
      });

      // Agregar el archivo
      formData.append("file", audioFile);

      // Imprimir el FormData para depuración
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      // Enviar los datos al backend
      const response = await createAudio(formData);
      console.log("Audio creado:", response.data);
      router.push("/");
    } catch (error: any) {
      console.error("Error al crear el audio:", error.message);
    }
  };

  useEffect(() => {
    console.log("El estado de audioData ha cambiado:", audioData);

    const fetchCategoriesAndGenres = async () => {
      try {
        const [genresResponse, categoriesResponse] = await Promise.all([
          getGenres(),
          getCategories(),
        ]);
        setGenres(genresResponse.data);
        setCategories(categoriesResponse.data);
        setTones(getTones())
      }
      catch(err) {
        console.error("Error al traer genres or categories:", err);
      }
    }
    fetchCategoriesAndGenres()

  }, [audioData, audioFile]);

  return (
    <form
    onSubmit={handleSubmit}
    className="bg-gray-800 p-5 rounded-lg w-full max-w-4xl mx-auto text-white grid grid-cols-2 gap-4"
  >
    {/* Nombre del Audio */}
    <div>
      <label htmlFor="audio_name" className="block mb-2 text-sm font-medium">
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

    {/* Precio */}
    <div>
      <label htmlFor="price" className="block mb-2 text-sm font-medium">
        Precio
      </label>
      <input
        type="number"
        name="price"
        onChange={handleInputChange}
        placeholder="$ Precio del audio"
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Categoría */}
    <div>
        <label htmlFor="category" className="block mb-2 text-sm font-medium">
          Categoría
        </label>
        <select
          name="category"
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category._id} value={category.nombre}>
              {category.nombre}
            </option>
          ))}
        </select>
      </div>

    {/* Género */}
    <div>
        <label htmlFor="genre" className="block mb-2 text-sm font-medium">
          Género
        </label>
        <select
          name="genre"
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione un género</option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre.nombre}>
              {genre.nombre}
            </option>
          ))}
        </select>
      </div>

    {/* Tamaño */}
    <div>
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

    {/* BPM */}
    <div>
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

    {/* Tono */}
    <div>
      <label htmlFor="tone" className="block mb-2 text-sm font-medium">
        Tono
      </label>
      <select
          name="tone"
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione tonalidad</option>
          {tones.map((tone, index) => (
            <option key={index} value={tone}>
              {tone}
            </option>
          ))}
        </select>
    </div>

    {/* Duración */}
    <div>
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

    {/* Descripción */}
    <div className="col-span-2">
      <label htmlFor="description" className="block mb-2 text-sm font-medium">
        Descripción
      </label>
      <textarea
        name="description"
        onChange={handleInputChange}
        placeholder="Descripción del audio"
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Archivo */}
    <div className="col-span-2">
      <label htmlFor="file" className="block mb-2 text-sm font-medium">
        Archivo de Audio
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Botón de envío */}
    <div className="col-span-2 flex justify-center">
      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
      >
        Cargar Audio
      </button>
    </div>
  </form>
  );
};

export default AudioForm;
