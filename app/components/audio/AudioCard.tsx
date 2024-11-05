"use client";

import * as React from "react";
const { useMemo, useState, useCallback, useRef } = React;
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
} from "react-icons/bs";

type AudioProps = {
  name: string;
  creator: string;
  bpm: number;
  tone: string;
  genre: string;
  category: string;
  duration: string;
  audioUrl: string;
  onAddToFavorites: () => void;
  onAddToCart: () => void;
};

const AudioCard: React.FC<AudioProps> = ({
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

  return (
    <>
      <div className="container">
        <div className="sub-container">
          <p>{name}</p>
          <div ref={containerRef} />

          <div className="wavesurfer-container" />

          <div style={{ margin: "1em 2", display: "flex", gap: "1em" }}>
            <div>
              <p>BPM: {bpm}</p>

              <p>Duración : {length}</p>

              <p>Tonalidad: {tone}</p>

              <p>Género: {genre}</p>
            </div>

            <div>
              <p>Creador : {creator}</p>

              <p>Categoría : {category}</p>
            </div>

            <div className="wavesurfer-controls">
              <button onClick={onPlayPause} style={{ minWidth: "5em" }}>
                {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioCard;
