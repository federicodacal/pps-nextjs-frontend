import axios from 'axios';
import { NEXT_PUBLIC_PROXY }  from './config';
import { Audio, AudioPayload, AudioDB }  from '../types/audio';

// Audio Services
export const createAudio = async (audioData: FormData) => {
    return axios.post(`${NEXT_PUBLIC_PROXY}/audios`, audioData);
};

export const getAllAudios = async () => {
    return axios.get<Audio[]>(`${NEXT_PUBLIC_PROXY}/audios`);
};

export const getAudioById = async (id: string) => {
    return axios.get<AudioDB>(`${NEXT_PUBLIC_PROXY}/audios/${id}`);
};