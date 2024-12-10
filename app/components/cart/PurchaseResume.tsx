"use client"

import { AudioDB } from "../../types/audio"
import {
    BsTrash2,
    BsTrash3,
    BsTrash3Fill
} from "react-icons/bs";
import AudioWavePlayer from "../audio/AudioPlayerWave";
import { useState } from "react";

interface AudioItemProps {
    items: AudioDB[];
}

async function urlToFile(url: string, fileName: string): Promise<File> {
    // Descargar el contenido del archivo desde la URL
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al descargar el archivo: ${response.statusText}`);
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Crear un objeto File a partir del Blob
    return new File([blob], fileName, { type: blob.type });
}

const getAudioFile = async (audio: AudioDB) => {
    urlToFile(audio.file_url, audio.file_name).then((file) => {
        return file
    })
    return File
}

const PurchaseResume: React.FC<AudioItemProps> = ({ items }) => {
    const [audioFile, setAudioFile] = useState<File | null>(null);

    const removeItem = (index: number) => {
        items.splice(index,1)

        console.log(items[index])
    }

    return (
        <div className="h-full text-violet-200 flex flex-col items-center w-4xl mt-10 gap-5">
            {items.map((audio, index) => (
                <div key={index} className="bg-purple-800">
                    <div key={index} className=" p-4 mb-2 shadow-md flex rounded-md gap-10">
                        <div className="w-full">
                            <p>Nombre: {audio.audio_name}</p>

                        </div>
                        <div className="w-full">
                            <p>Categoría: {audio.category}</p>
                            <p>Genero: {audio.genre}</p>
                            <p>Valor: ${audio.item.price}</p>
                        </div>

                    </div>
                    <div>
                    </div>
                    <button
                        onClick={() => removeItem(index)}
                        className="flex place-items-center m-5 max-h-10 rounded bg-rose-400 hover:bg-rose-200 text-slate-800 px-5 py-5 "
                    >
                        <BsTrash3 />
                    </button>
                </div>

            ))}
        </div>

    );
};

export default PurchaseResume;