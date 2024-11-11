'use client';

import { useState } from "react";
import { createAudio } from "@/app/services/audio-service";
import { useRouter } from "next/navigation";

const UploadAudio = () => {
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
        price: ""
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAudioFile(e.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAudioData({ ...audioData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!audioFile) return alert("Por favor, selecciona un archivo de audio");

        const formData = new FormData();
        Object.keys(audioData).forEach(key => formData.append(key, audioData[key as keyof typeof audioData]));
        formData.append("file", audioFile);

        try {
            const response = await createAudio(formData);
            console.log("Audio creado:", response.data);
            router.push('/home');
        } catch (error) {
            console.error("Error al crear el audio:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '600px', margin: 'auto', color: '#fff' }}>
            
            {/* Campos para los datos del audio */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="ID" style={{ display: 'block', marginBottom: '5px' }}>ID</label>
                <input type="text" name="ID" onChange={handleInputChange} placeholder="Ingrese el ID del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="creator_ID" style={{ display: 'block', marginBottom: '5px' }}>Creator ID</label>
                <input type="text" name="creator_ID" onChange={handleInputChange} placeholder="Ingrese el ID del creador" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="item_ID" style={{ display: 'block', marginBottom: '5px' }}>Item ID</label>
                <input type="text" name="item_ID" onChange={handleInputChange} placeholder="Ingrese el ID del creador" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            {/* Otros campos de audio */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="audio_name" style={{ display: 'block', marginBottom: '5px' }}>Nombre del Audio</label>
                <input type="text" name="audio_name" onChange={handleInputChange} placeholder="Nombre del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="state" style={{ display: 'block', marginBottom: '5px' }}>Estado</label>
                <input type="text" name="state" onChange={handleInputChange} placeholder="Estado del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="state_item" style={{ display: 'block', marginBottom: '5px' }}>Estado</label>
                <input type="text" name="state_item" onChange={handleInputChange} placeholder="Estado del item" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>Categoría</label>
                <input type="text" name="category" onChange={handleInputChange} placeholder="Categoría del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="genre" style={{ display: 'block', marginBottom: '5px' }}>Género</label>
                <input type="text" name="genre" onChange={handleInputChange} placeholder="Género del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="size" style={{ display: 'block', marginBottom: '5px' }}>Tamaño</label>
                <input type="number" name="size" onChange={handleInputChange} placeholder="Tamaño del archivo" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="BPM" style={{ display: 'block', marginBottom: '5px' }}>BPM</label>
                <input type="number" name="BPM" onChange={handleInputChange} placeholder="BPM del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="tone" style={{ display: 'block', marginBottom: '5px' }}>Tono</label>
                <input type="number" name="tone" onChange={handleInputChange} placeholder="Tono del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="length" style={{ display: 'block', marginBottom: '5px' }}>Duración</label>
                <input type="number" name="length" onChange={handleInputChange} placeholder="Duración del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="price" style={{ display: 'block', marginBottom: '5px' }}>Duración</label>
                <input type="number" name="price" onChange={handleInputChange} placeholder="$ Precio del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Descripción</label>
                <textarea name="description" onChange={handleInputChange} placeholder="Descripción del audio" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>
            

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="file" style={{ display: 'block', marginBottom: '5px' }}>Archivo de Audio</label>
                <input type="file" onChange={handleFileChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#444', color: '#fff' }} />
            </div>
            

            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cargar Audio
            </button>
        </form>
    );
};

export default UploadAudio;
