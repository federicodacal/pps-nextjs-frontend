import axios from 'axios';
import { NEXT_PUBLIC_PROXY, API_BASE_URL } from './config';

const DEV_URL = 'http://127.0.0.1:5000'

export const getCarrousel = async () => {
    return axios.get<any[]>(`${NEXT_PUBLIC_PROXY}/carrousel`);
};