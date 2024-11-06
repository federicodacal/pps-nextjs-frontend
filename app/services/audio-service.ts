import axios from 'axios';
import { API_URL, PROXY }  from './config';
import { Audio, AudioPayload }  from '../types/audio';

// Audio Services
export const createAudio = async (audioData: FormData) => {
    return axios.post(`${API_URL.DEV}/audios`, audioData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const getAllAudios = async () => {
    return axios.get<Audio[]>(`${API_URL.DEV}/audios`);
};

export const getAudioById = async (id: string) => {
    return axios.get<Audio>(`${PROXY}/audios/${id}`);
};