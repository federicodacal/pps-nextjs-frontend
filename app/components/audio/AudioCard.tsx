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
} from "react-icons/bs";

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
  onAddToFavorites: (id:number) => void;
  onAddToCart: (id:number) => void;
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
  onAddToFavorites,
  onAddToCart,
}) => {
  const containerRef = useRef(null);
  const [urlIndex, setUrlIndex] = useState(0);

  console.log(id)
  console.log(name)
  console.log(audioUrl)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const addToCart = (audioId: string) => {
    let selectedAudios = storage.getItem("selected_audios")

    console.log(selectedAudios)

    if (selectedAudios == null) {
      selectedAudios = ""
    };

    storage.setItem("selected_audios", selectedAudios += audioId.toString() +"," )
  };

  const addToFavorites = (audioId: string) => {
    console.log(`Audio ${audioId} added to favourites`)
  };


  return (
    <>
      <div className="container">
        <div className="sub-container">
          <div>
            <h1>{name}</h1>
          </div>
          <div ref={containerRef} />
          <div className="wavesurfer-container" />
          <div >
            <div>
              <p>BPM: {bpm}</p>
              <p>Duración : {duration}</p>
              <p>Tonalidad: {tone}</p>
              <p>Género: {genre}</p>
            </div>
            <div>
              <p>Creador : {creator}</p>
              <p>Categoría : {category}</p>
            </div>
            <div className="wavesurfer-controls">
              <button onClick={onPlayPause} >
                {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
              </button>
              <button 
               onClick={() => addToCart(id)}
              >
                <BsPlusCircleFill/>
              </button>
              <button 
              onClick={() => addToFavorites(id)}
              >
                 <BsHeartFill/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioCard;
