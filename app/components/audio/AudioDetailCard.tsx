"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { refuseByID, approveByID } from '@/app/services/audio-service';
import { AudioDB } from '@/app/types/audio';
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import {
    BsFillStopFill,
    BsFillPlayFill,
    BsSkipForward,
    BsSkipBackward,
    BsPlusCircleFill,
    BsHeartFill,
    BsHeart,
} from "react-icons/bs";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import AudioPlayer from './AudioPlayer';

const AudioDetailCard = ({ audio }: { audio: AudioDB, full: boolean }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const { isFavorite, toggleFavorite } = useFavorites();
    const containerRef = useRef(null);
    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        height: 100,
        waveColor: "rgb(255, 200, 255)",
        progressColor: "rgb(100, 0, 100)",
        url: audio.file_url,
        plugins: useMemo(() => [Timeline.create()], []),
    });

    const onPlayPause = useCallback(() => {
        wavesurfer && wavesurfer.playPause();
    }, [wavesurfer]);

    const handleClick = (message: string) => {
        setAlertMessage(message);
        setTimeout(() => {
            setAlertMessage(null);
        }, 2000); // La alerta desaparece después de 1 segundo
    };


    useEffect(() => {

    }, []);


    const refuseData = async () => {
        try {
            const response = await refuseByID(audio.ID);

            console.log("Rechazo:", response.data);
            handleClick("Se ha rechazado el audio")
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    const approveData = async () => {
        try {
            const response = await approveByID(audio.ID);

            console.log("Aprobación:", response.data);
            handleClick("Se ha aprobado el audio")
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg space-y-4 m-10">
            <div className="container ">
                <div className="sub-container max-h-40">
                    <AudioPlayer
                        audioUrl={audio.file_url}
                        onAddToCart={() => {}}
                        onAddToFavorites={() => {}}
                        full={true}
                    />

                </div>
                <div>
                    {alertMessage && (
                        <div
                            className="fixed bottom-0 left-0 right-0 mx-auto mb-4 w-11/12 max-w-xl bg-yellow-500 text-black text-lg font-semibold px-6 py-4 rounded-lg shadow-lg animate-fade-in-out"
                            style={{ zIndex: 50 }}
                        >
                            {alertMessage}
                        </div>
                    )}
                </div>
            </div>
            <h1 className="text-2xl font-bold">{audio.audio_name}</h1>
            <p><strong>Categoría:</strong> {audio.category}</p>
            <p><strong>Género:</strong> {audio.genre}</p>
            <p><strong>Tonalidad:</strong> {audio.tone}</p>
            <p><strong>BPM:</strong> {audio.BPM}</p>
            <p><strong>Tamaño:</strong> {audio.size}</p>
            <p><strong>Duración:</strong> {audio.length}</p>
            <p><strong>Descripción:</strong> {audio.description}</p>
            <p><strong>Precio $:</strong> {audio.item.price}</p>
            <p><strong>Precio $:</strong> {audio.state}</p>
            <div className='h-full flex items-center justify-center gap-5 mt-10'>
                <button
                    className="px-4 py-2 bg-rose-400 text-white rounded hover:bg-rose-600"
                    onClick={() => refuseData()}
                >
                    Rechazar audio
                </button>
                <button
                    className="px-4 py-2 bg-emerald-400 text-white rounded hover:bg-emerald-600"
                    onClick={() => approveData()}
                >
                    Aprobar audio
                </button>
            </div>
            <div>
                {alertMessage && (
                    <div
                        className="fixed bottom-0 left-0 right-0 mx-auto mb-4 w-11/12 max-w-xl bg-yellow-500 text-black text-lg font-semibold px-6 py-4 rounded-lg shadow-lg animate-fade-in-out"
                        style={{ zIndex: 50 }}
                    >
                        {alertMessage}
                    </div>
                )}
            </div>

        </div>

    );
};

export default AudioDetailCard;