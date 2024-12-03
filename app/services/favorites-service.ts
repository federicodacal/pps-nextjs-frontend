import axios from 'axios';
import { PROXY }  from './config';

// Favorites Services
export const addFavorite = async (audio_ID: string, user_ID: string) => {
    return axios.post(`http://localhost:5000/favorites/${audio_ID}`, { user_ID });
  };
  
  export const getFavoritesByUserId = async (user_ID: string) => {
    return axios.get<any[]>(`http://localhost:5000/favorites/${user_ID}`);
  };
  
  export const deleteByAudioId = async (audio_ID: string, user_ID: string) => {
    return axios.delete(`http://localhost:5000/favorites/${audio_ID}`, {
      data: { user_ID },
    });
  };
