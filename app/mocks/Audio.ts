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
      category: 'sample' ,
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
      category: 'effect' ,
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
      category: 'acapella' ,
      state_item: "Ready",
      state:"Ready",
      size: "",
      price: "9",
    },
    
    // Agrega más audios según necesites
  ]


  const hardcodedAudios = [
    {
      id: "ejemplo_01",
      name: 'Sample Audio 1',
      creator: 'Creator A',
      bpm: 120,
      tone: 'C',
      genre: 'Pop',
      category: 'Sample',
      duration: '3:30',
      audioUrl: '../samples/sample1.wav',
    },
    {
      id: "nuevo_id_audio_55",
      name: 'Sample Audio 2',
      creator: 'Creator A',
      bpm: 120,
      tone: 'C',
      genre: 'Pop',
      category: 'Sample',
      duration: '3:30',
      audioUrl: '../samples/sample2.wav',
    },
    // Puedes agregar más audios mockeados aquí
  ];