'use client'

import * as React from 'react'
const { useMemo, useState, useCallback, useRef } = React
import { createRoot } from 'react-dom/client'
import { useWavesurfer } from '@wavesurfer/react'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'

type AudioProps = {
    name: string;
    creator: string;
    bpm: number;
    key: string;
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
    key,
    genre,
    category,
    duration,
    audioUrl,
    onAddToFavorites,
    onAddToCart,
  }) => {
    const containerRef = useRef(null)
    const [urlIndex, setUrlIndex] = useState(0)
  
    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
      container: containerRef,
      height: 100,
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: audioUrl,
      plugins: useMemo(() => [Timeline.create()], []),
    })
  
    
    const onPlayPause = useCallback(() => {
      wavesurfer && wavesurfer.playPause()
    }, [wavesurfer])
  
    return (
      <>
        <div ref={containerRef} />
  
        <p>Current audio: {name}</p>
  
  
        <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
  
          <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </>
    )
  };
  
  export default AudioCard;