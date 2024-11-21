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

export interface AudioPayload {
    name: string;
    description: string;
    tone: string;
    BPM: number;
    genre: string;
    category: string;
}