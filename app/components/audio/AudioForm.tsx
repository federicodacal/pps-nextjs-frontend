"use client";

import { useState, useEffect } from "react";
import { createAudio } from "@/app/services/audio-service";
import { useRouter } from "next/navigation";
import AudioWavePlayer from "../../components/audio/AudioPlayerWave";
import { Audio } from "../../types/audio"
import { getCategories, getGenres } from "@/app/services/genres-and-categories-service";
import { useAuth } from '@/app/contexts/AuthContext';
import Notification from "@/app/components/notification/Notification";

interface FormValues {
  ID: string,
  creator_ID: string,
  audio_name: string,
  state: string,
  category: string,
  genre: string,
  BPM: number,
  tone: string,
  length: string,
  file_url: string,
  size: number,
  description: string,
  state_item: string,
  price: string,
}

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
  return ["C", "C#", "D", "D#", "E", "F", "G", "G#", "F", "F#", "G", "G#", "A", "A#", "B", "Bb", "Ab", "Gb", "Eb", "Db"]
}

const AudioForm = () => {
  const router = useRouter();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioData, setAudioData] = useState<Audio>(newAudio);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<FormValues>(newAudio);
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tones, setTones] = useState<string[]>(getTones());
  const { creatorId } = useAuth();
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target; 
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
      const validTypes = ["audio/wav"];
      if (!validTypes.includes(file.type)) {
        setNotification({ message: "Por favor, cargue un archivo de audio en formato WAV.", type: 'error' });
        setAudioFile(null); 
        return; 
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setNotification({ message: "El tamaño máximo permitido es 2MB.", type: 'error' });
        setAudioFile(null); 
        return; 
      }

      setNotification(null);
      setAudioFile(file);
      setErrors((prevErrors) => {
        const { audioFile, ...rest } = prevErrors; // Elimina el error de 'audioFile'
        return rest;
      });
    } else {
      setNotification(null);
      setAudioFile(null); 
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    //setAudioData({ ...formValues, [name]: value });
    //setErrors({ ...errors, [name]: '' });

    // Eliminar esto
     setAudioData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name]; 
      return updatedErrors;
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!audioFile) newErrors.audioFile = "Seleccione un archivo de audio";

    if (!audioData.audio_name) newErrors.audio_name = "El nombre del archivo es obligatorio";
    else if (audioData.audio_name.length > 49) newErrors.audio_name = "El nombre del archivo debe tener como máximo 49 caracteres"

    if (!audioData.price) newErrors.price = "El precio es obligatorio";
    else if (!/^\d+$/.test(audioData.price) || Number(audioData.price) < 0 || Number(audioData.price) > 100000) {
      newErrors.price = "El precio debe ser un número entre 0 y 100000";
    }

    if (!audioData.category) newErrors.category = "La categoria es obligatoria";

    if (!audioData.genre) newErrors.genre = "El género es obligatorio";

    if (!audioData.size) newErrors.size = "El tamaño es obligatorio";
    else if (audioData.size < 1 || audioData.size > 2000) newErrors.size = "El tamaño debe estar entre 1 y 2000";

    if (!audioData.BPM) newErrors.BPM = "El BPM es obligatorio";
    else if (!/^\d+$/.test(audioData.BPM.toLocaleString()) || audioData.BPM < 1 || audioData.BPM > 300) {
      newErrors.BPM = "El BPM debe ser un número entre 1 y 300";
    }
    
    if (!audioData.tone) newErrors.tone = "El tono es obligatorio";

    if (!audioData.length) newErrors.length = "La duración es obligatoria";
    else if (Number(audioData.length) < 1 || Number(audioData.length) > 120) newErrors.length = "La duración debe estar entre 1 y 120 segundos";

    if (!audioData.description) newErrors.description = "La descripción es obligatoria";
    else if (audioData.description.length > 199) newErrors.description = "La descripción debe tener como máximo 199 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsPending(true);

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
      if (audioFile instanceof File) {
        formData.append("file", audioFile);
      } else {
        throw new Error("El archivo de audio no es válido.");
      }

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
      setNotification({ message: `Error al crear el audio: ${error.message}`, type: 'error' });
    } finally {
      setIsPending(false)
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
      catch (err) {
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
        {errors.audio_name && <p className="text-red-500 font-bold">{errors.audio_name}</p>}
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
        {errors.price && <p className="text-red-500 font-bold">{errors.price}</p>}
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
        {errors.category && <p className="text-red-500 font-bold">{errors.category}</p>}
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
        {errors.genre && <p className="text-red-500 font-bold">{errors.genre}</p>}
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
        {errors.size && <p className="text-red-500 font-bold">{errors.size}</p>}
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
        {errors.BPM && <p className="text-red-500 font-bold">{errors.BPM}</p>}
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
        {errors.tone && <p className="text-red-500 font-bold">{errors.tone}</p>}
      </div>

      {/* Duración */}
      <div>
        <label htmlFor="length" className="block mb-2 text-sm font-medium">
          Duración (en segundos)
        </label>
        <input
          type="number"
          name="length"
          onChange={handleInputChange}
          placeholder="Duración del audio"
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.length && <p className="text-red-500 font-bold">{errors.length}</p>}
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
        {errors.description && <p className="text-red-500 font-bold">{errors.description}</p>}
      </div>

      {/* Archivo */}
      <div className="col-span-2">
        <label htmlFor="file" className="block mb-2 text-sm font-medium">
          Archivo de Audio
        </label>
          {errors.audioFile && <p className="text-red-500 font-bold">{errors.audioFile}</p>}   
        <div className="flex flex-auto gap-28">
          <input
            type="file"
            accept="audio/wav"
            onChange={handleFileChange}
            className="w-fit h-12 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AudioWavePlayer audioFile={audioFile} />
        </div>
      </div>

      {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}
      {/* Botón de envío */}
      <div className="col-span-2 flex justify-center mt-5">
      <button
        type="submit"
        className={`w-full py-2 rounded-md transition-colors ${isPending ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"}`}
        disabled={isPending}
        >
        {isPending ? "Procesando..." : "Cargar Audio"}
        </button>
      </div>
    </form>
  );
};


export default AudioForm;
