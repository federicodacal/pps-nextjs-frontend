import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

export const getGenres = async () => {
    return axios.get<any[]>(`${BASE_URL}/api/generos`);
};

export const getCategories = async () => {
    return axios.get<any[]>(`${BASE_URL}/api/categorias`);
};