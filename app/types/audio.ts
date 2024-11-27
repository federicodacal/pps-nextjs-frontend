export interface Audio {
    ID: string,
    creator_ID: string,
    audio_name: string,
    state: string,
    category: string,
    genre: string,
    BPM: string,
    tone: string,
    length: string,
    size: string,
    description: string,
    state_item: string,
    price: string,
}

export interface AudioDB {
    BPM: number
    ID: string
    audio_name: string
    category: string
    created_at: string
    creator_ID: string
    description: string
    file_name: string
    file_url: string
    genre: string
    item: AudioItem
    length: number
    modified_at: string
    score: number
    size: number
    state: string
    tone: number
  }
  
  export interface AudioItem {
    ID: string
    audio_ID: string
    created_at: string
    creator_ID: string
    modified_at: string
    price: number
    state: string
  }
  

export interface AudioPayload {
    name: string;
    description: string;
    tone: string;
    BPM: number;
    genre: string;
    category: string;
}