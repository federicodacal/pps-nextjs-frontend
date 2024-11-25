import axios from 'axios';
import { API_BASE_URL, PROXY }  from './config';

// Auth Services
export async function loginUser(userData: { email: string; pwd: string }) {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/login`, userData);
      return response.data; 
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Error en el servidor" };
    }
}

export async function logoutUser(token:any) {
  try {
    const response = await axios.post(`http://127.0.0.1:5000/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Error en el servidor" };
  }
}