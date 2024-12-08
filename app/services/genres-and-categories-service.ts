import axios from 'axios';
import { DATA_BASE_URL, NEXT_PUBLIC_DATA_PROXY } from './config';

const DEV_URL = 'http://127.0.0.1:5000'

export const getGenres = async () => {
    return axios.get<any[]>(`${DEV_URL}/genres`);
};

export const getGenresServer = async () => {
    return axios.get<any[]>(`${DEV_URL}/genres`);
};

export const getCategories = async () => {
    return axios.get<any[]>(`${DEV_URL}/categories`);
};

export const getCategoriesServer = async () => {
    return axios.get<any[]>(`${DEV_URL}/categories`);
};