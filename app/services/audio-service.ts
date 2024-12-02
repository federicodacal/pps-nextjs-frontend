import axios from 'axios';
import { PROXY, API_BASE_URL }  from './config';
import { Audio, AudioPayload }  from '../types/audio';

// Audio Services
export const createAudio = async (audioData: FormData) => {
    return axios.post(`${API_BASE_URL}/audios`, audioData);
};

export const getAllAudios = async () => {
    return axios.get<Audio[]>(`${API_BASE_URL}/audios`);
};

export const getAudioById = async (id: string) => {
    return axios.get<Audio>(`${API_BASE_URL}/audios/${id}`);
};