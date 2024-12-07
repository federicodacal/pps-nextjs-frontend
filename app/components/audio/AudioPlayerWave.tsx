// components/AudioWavePlayer.tsx
"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { BsFillStopFill, BsFillPlayFill } from "react-icons/bs";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

interface AudioWavePlayerProps {
  audioFile: File | null;
}

const AudioWavePlayer: React.FC<AudioWavePlayerProps> = ({ audioFile }) => {
  const containerRef = useRef(null);
  const urlRef = useRef<string | null>(null);
  var url = undefined

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 80,
    waveColor: "rgb(226, 201, 230)",
    progressColor: "rgb(100, 0, 100)",
    plugins: useMemo(() => [Timeline.create()], []),
  });

  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      urlRef.current = url;
      wavesurfer?.load(url)

      return () => {
        if (urlRef.current) {
          URL.revokeObjectURL(urlRef.current);
          urlRef.current = null;
        }
      };
    }
  }, [audioFile]);

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
      <div className="sub-container-sm">
        <div ref={containerRef} />
        <div className="wavesurfer-container" />
        <div className="wavesurfer-controls">
          <button onClick={onPlayPause} >
            {isPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
          </button>
        </div>
      </div>
  );
};

export default AudioWavePlayer;
