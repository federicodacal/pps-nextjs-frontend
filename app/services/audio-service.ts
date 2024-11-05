import axios from 'axios';
import { PROXY }  from './config';
import { Audio, AudioPayload }  from '../types/audio';

// Audio Services
export const createAudio = async (audioData: AudioPayload) => {
    return axios.post(`${PROXY}/audios`, audioData);
};

export const getAllAudios = async () => {
    return axios.get<Audio[]>(`${PROXY}/audios`);
};

export const getAudioById = async (id: string) => {
    return axios.get<Audio>(`${PROXY}/audios/${id}`);
};