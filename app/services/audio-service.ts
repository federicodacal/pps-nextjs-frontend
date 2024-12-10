import axios from 'axios';
import { NEXT_PUBLIC_PROXY, API_BASE_URL }  from './config';
import { Audio, AudioPayload, AudioDB }  from '../types/audio';

// Audio Services
export const createAudio = async (audioData: FormData) => {
    return axios.post(`${NEXT_PUBLIC_PROXY}/audios`, audioData);
};

export const getAllAudios = async () => {
    return axios.get<Audio[]>(`${NEXT_PUBLIC_PROXY}/audios`);
};

export const getAudioById = async (id: string) => {
    console.log(id)
    return axios.get<AudioDB>(`${NEXT_PUBLIC_PROXY}/audios/${id}`);
};

export const getAudioByIdServer = async (id: string) => {
    return axios.get<AudioDB>(`${API_BASE_URL}/audios/${id}`);
};

export const refuseByID = async (userId: string) => {
    const response = axios.delete(`${NEXT_PUBLIC_PROXY}/audios/approval/${userId}`);

    return response
};

export const approveByID = async (userId: string) => {
    const response = axios.put(`${NEXT_PUBLIC_PROXY}/audios/approval/${userId}`);

    return response
};