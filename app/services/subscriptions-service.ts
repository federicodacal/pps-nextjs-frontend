import axios from 'axios';

const BASE_URL = 'https://admin-audiolibre-api.vercel.app'

export const getSubscriptions = async () => {
    return axios.get<any[]>(`${BASE_URL}/api/suscripciones`);
};