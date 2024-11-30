import { Audio, AudioDB } from "@/app/types/audio"

export const AUDIOS: AudioDB[] = [
  {
    ID: "0f4e6f7f-1e60-4bc3-84c1-57cecb9fb3cd",
    BPM: 100,
    audio_name: "Primer audio",
    category: "sample",
    created_at: "Tue, 26 Nov 2024 05:55:58 GMT",
    creator_ID: "creator_003",
    description: "Mi primer audio publicado. Saludos!",
    file_name: "674562d0a52325dd8bbbbf87",
    file_url: "https://pps-flask-api.vercel.app/audios/file/674562d0a52325dd8bbbbf87",
    genre: "pop",
    item: {
      ID: "32972b16-33c8-47aa-bc83-53c0daf7af14",
      audio_ID: "0f4e6f7f-1e60-4bc3-84c1-57cecb9fb3cd",
      created_at: "2024-11-26T05:55:58.211333",
      creator_ID: "creator_003",
      modified_at: "2024-11-26T05:55:58.211333",
      price: 35.0,
      state: "created",
    },
    length: 10,
    modified_at: "Tue, 26 Nov 2024 05:55:58 GMT",
    score: 0,
    size: 3,
    state: "created",
    tone: 4,
  },
  {
    BPM: 1,
    ID: "caff3de6-ae3c-453d-808d-ed3a30afbdb7",
    audio_name: "jumping alien synth",
    category: "sample",
    created_at: "Tue, 26 Nov 2024 06:23:28 GMT",
    creator_ID: "creator_003",
    description: "descarguen porfa!!! xd",
    file_name: "6745695c7d7d626ac16312d2",
    file_url: "https://pps-flask-api.vercel.app/audios/file/6745695c7d7d626ac16312d2",
    genre: "synth",
    item: {
      ID: "50f61702-0957-45e6-98c9-0e15bde30770",
      audio_ID: "caff3de6-ae3c-453d-808d-ed3a30afbdb7",
      created_at: "2024-11-26T06:23:28.560726",
      creator_ID: "creator_003",
      modified_at: "2024-11-26T06:23:28.560726",
      price: 5.0,
      state: "created"
    },
    length: 10,
    modified_at: "Tue, 26 Nov 2024 06:23:28 GMT",
    score: 0,
    size: 1,
    state: "created",
    tone: 3
  },
  {
    BPM: 90,
    ID: "7f65344c-0988-4146-a6dd-0e202fb4e9c5",
    audio_name: "arabian melody in Dm",
    category: "sample",
    created_at: "Tue, 26 Nov 2024 06:29:54 GMT",
    creator_ID: "creator_003",
    description: "my first upload! this site is really amazing. cheers from florencio varela",
    file_name: "67456ac77d7d626ac16312d5",
    file_url: "https://pps-flask-api.vercel.app/audios/file/67456ac77d7d626ac16312d5",
    genre: "folk music",
    item: {
      ID: "72c05268-0e38-4b29-ae35-c7439d05c409",
      audio_ID: "7f65344c-0988-4146-a6dd-0e202fb4e9c5",
      created_at: "2024-11-26T06:29:54.993204",
      creator_ID: "creator_003",
      modified_at: "2024-11-26T06:29:54.993204",
      price: 2.0,
      state: "created"
    },
    length: 10,
    modified_at: "Tue, 26 Nov 2024 06:29:54 GMT",
    score: 0,
    size: 1,
    state: "created",
    tone: 3
  },

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