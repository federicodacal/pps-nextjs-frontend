import axios from 'axios';
import { NEXT_PUBLIC_DATA_PROXY, DATA_BASE_URL } from './config';

export const getCarrousel = async () => {
    return axios.get<any[]>(`${DATA_BASE_URL}/carrousel`);
};