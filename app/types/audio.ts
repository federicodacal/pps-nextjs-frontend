export interface Audio {
    id: string;
    name: string;
    description: string;
    tone: string;
    bpm: number;
    genre: string;
    category: string;
}

export interface AudioPayload {
    name: string;
    description: string;
    tone: string;
    bpm: number;
    genre: string;
    category: string;
}