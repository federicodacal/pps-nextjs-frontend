import axios from 'axios';
import { NEXT_PUBLIC_PROXY, API_BASE_URL }  from './config';

// Favorites Services
export const addFavorite = async (audio_ID: string, user_ID: string) => {
    //return axios.post(`${NEXT_PUBLIC_PROXY}${audio_ID}`, { user_ID });
    return axios.post(`${API_BASE_URL}/favorites/${audio_ID}`, { user_ID });
  };
  
  export const getFavoritesByUserId = async (user_ID: string) => {
    //return axios.get<any[]>(`${NEXT_PUBLIC_PROXY}${user_ID}`);
    return axios.get<any[]>(`${API_BASE_URL}/favorites/${user_ID}`);
  };
  
  export const deleteByAudioId = async (audio_ID: string, user_ID: string) => {
    //return axios.delete(`${NEXT_PUBLIC_PROXY}${audio_ID}`, {
    //  data: { user_ID },
    //});
    return axios.delete(`${API_BASE_URL}/favorites/${audio_ID}`, {
      data: { user_ID },
    });
  };
