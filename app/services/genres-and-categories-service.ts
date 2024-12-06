import axios from 'axios';
import { DATA_BASE_URL, NEXT_PUBLIC_DATA_PROXY } from './config';

export const getGenres = async () => {
    return axios.get<any[]>(`${NEXT_PUBLIC_DATA_PROXY}/generos`);
};

export const getGenresServer = async () => {
    return axios.get<any[]>(`${DATA_BASE_URL}/generos`);
};

export const getCategories = async () => {
    return axios.get<any[]>(`${NEXT_PUBLIC_DATA_PROXY}/categorias`);
};

export const getCategoriesServer = async () => {
    return axios.get<any[]>(`${DATA_BASE_URL}/categorias`);
};