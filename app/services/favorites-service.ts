import axios from 'axios';
import { NEXT_PUBLIC_PROXY }  from './config';

// Favorites Services
export const addFavorite = async (audio_ID: string, user_ID: string) => {
    return axios.post(`${NEXT_PUBLIC_PROXY}${audio_ID}`, { user_ID });
  };
  
  export const getFavoritesByUserId = async (user_ID: string) => {
    return axios.get<any[]>(`${NEXT_PUBLIC_PROXY}${user_ID}`);
  };
  
  export const deleteByAudioId = async (audio_ID: string, user_ID: string) => {
    return axios.delete(`${NEXT_PUBLIC_PROXY}${audio_ID}`, {
      data: { user_ID },
    });
  };
