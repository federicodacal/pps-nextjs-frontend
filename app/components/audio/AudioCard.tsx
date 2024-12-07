"use client";

import * as React from "react";
const { useMemo, useState, useCallback, useRef } = React;
import storage from "local-storage-fallback";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
  BsPlusCircleFill,
  BsHeartFill,
  BsBagHeart,
  BsHeart,
  BsFillHeartFill,
} from "react-icons/bs";
import { useFavorites } from "@/app/contexts/FavoritesContext";

type AudioProps = {
  id: string,
  name: string;
  creator: string;
  bpm: string;
  tone: string;
  genre: string;
  category: string;
  duration: string;
  audioUrl: string;
  onAddToCart: (id: string) => void;
  onAddToFavorites: (id: string) => void;
};

const AudioCard: React.FC<AudioProps> = ({
  id,
  name,
  creator,
  bpm,
  tone,
  genre,
  category,
  duration,
  audioUrl,
  onAddToCart
}) => {
  const containerRef = useRef(null);
  const [urlIndex, setUrlIndex] = useState(0);
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 80,
    waveColor: "rgb(255, 200, 255)",
    progressColor: "rgb(100, 0, 100)",
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  let textoAlerta = ""

  const handleClick = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 1000);
  };

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const addToCart = (audioId: string) => {
    let selectedAudios = storage.getItem("selected_audios")

    console.log(selectedAudios)

    if (selectedAudios == null) {
      selectedAudios = ""
    };

    handleClick("Se ha agregado al carrito")

    storage.setItem("selected_audios", selectedAudios += audioId.toString() + ",")
  };

  const addToFavorites = (audioId: string) => {
    toggleFavorite(audioId)

    handleClick("Se ha agregado a favoritos")
  };

  return (
    <>
      <div className="container ">
        <div className="sub-container">
          <div className="flex p-3 m-3 font-semibold">
            <h1>{name}</h1>
          </div>
          <div ref={containerRef} />
          <div className="wavesurfer-container" />
          <div>
            <div className="flex p-2 m-2 font-medium gap-5">
              <p>BPM: {bpm}</p>
              <p>Duración : {duration}</p>
              <p>Tonalidad: {tone}</p>
              <p>Género: {genre}</p>
            </div>
            <div className="flex p-2 m-2 font-medium gap-5">
              <p>Creador : {creator}</p>
              <p>Categoría : {category}</p>
            </div>
            <div className="wavesurfer-controls flex place-content-center gap-5">
              <button onClick={onPlayPause} >
                {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
              </button>
              <button
                onClick={() => addToCart(id)}
              >
                <BsPlusCircleFill />
              </button>
              <button onClick={() => addToFavorites(id)}>
                {isFavorite(id) ?  <BsFillHeartFill/> : <BsHeart/>}
              </button>
            </div>
          </div>

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
    </>
  );
};

export default AudioCard;
