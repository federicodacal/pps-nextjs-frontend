import { Audio } from "@/app/types/audio"

export const AUDIOS: Audio[] = [
    { 
      ID: '1',
      audio_name: 'Audio 1', 
      description: 'Audio 1',
      creator_ID: 'Creador 1', 
      BPM: "120", 
      tone: 'C', 
      length: "320", 
      genre: 'Rock', 
      category: 'Instrumental' ,
      state_item: "Ready",
      state:"Ready",
      size: "",
      price: "9",

    },
    { 
      ID: '2',
      audio_name: 'Audio 2', 
      description: 'Audio 2',
      creator_ID: 'Creador 2', 
      BPM: "89", 
      tone: 'D', 
      length:"320", 
      genre: 'Pop', 
      category: 'Instrumental' ,
      state_item: "Ready",
      state:"Ready",
      size: "",
      price: "9",
    },
    { 
      ID: '3',
      audio_name: 'Audio 3', 
      description: 'Audio 3',
      creator_ID: 'Creador 3', 
      BPM: "100", 
      tone: 'F', 
      length: "280", 
      genre: 'Tango', 
      category: 'Instrumental' ,
      state_item: "Ready",
      state:"Ready",
      size: "",
      price: "9",
    },
    
    // Agrega más audios según necesites
  ]