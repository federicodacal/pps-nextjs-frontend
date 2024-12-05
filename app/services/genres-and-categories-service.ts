import axios from 'axios';
import { DATA_BASE_URL } from './config';

export const getGenres = async () => {
    return axios.get<any[]>(`${DATA_BASE_URL}/api/generos`);
};

export const getCategories = async () => {
    return axios.get<any[]>(`${DATA_BASE_URL}/api/categorias`);
};