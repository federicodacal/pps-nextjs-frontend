'use client'

import { useEffect, useState } from 'react';
import { getAllAudios } from '../../services/audio-service';
import { Audio } from '../../types/audio';
import AudioCard from '../../components/audio/AudioCard';

export default function Home() {
    const [audios, setAudios] = useState<Audio[]>([]);

    useEffect(() => {
        const fetchAudios = async () => {
            try {
                const response = await getAllAudios();
                setAudios(response.data);
            } catch (error) {
                console.error("Error fetching audios:", error);
            }
        };

        fetchAudios();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todos los Audios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {audios.map(audio => (
                    <AudioCard key={audio.id} audio={audio} />
                ))}
            </div>
        </div>
    );
};

