import axios from 'axios';
import { API_BASE_URL, NEXT_PUBLIC_PROXY } from './config';

const DEV_URL = 'http://127.0.0.1:5000'

export const getGenres = async () => {
    return axios.get<any[]>(`${NEXT_PUBLIC_PROXY}/genres`);
};

export const getGenresServer = async () => {
    return axios.get<any[]>(`${API_BASE_URL}/genres`);
};

export const getCategories = async () => {
    return axios.get<any[]>(`${NEXT_PUBLIC_PROXY}/categories`);
};

export const getCategoriesServer = async () => {
    return axios.get<any[]>(`${API_BASE_URL}/categories`);
};