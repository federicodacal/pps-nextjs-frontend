export interface Audio {
    id: string;
    audio_name: string;
    creator_ID: string;
    description: string;
    length: number;
    tone: string;
    BPM: number;
    genre: string;
    category: string;
}

export interface AudioPayload {
    name: string;
    description: string;
    tone: string;
    BPM: number;
    genre: string;
    category: string;
}