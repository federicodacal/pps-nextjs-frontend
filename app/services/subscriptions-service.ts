import axios from 'axios';

const BASE_URL = 'https://admin-audiolibre-api.vercel.app'
const DEV_URL = 'http://127.0.0.1:5000'

export const getSubscriptions = async () => {
    return axios.get<any[]>(`${DEV_URL}/subscriptions`);
};