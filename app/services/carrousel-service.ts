import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

export const getCarrousel = async () => {
    return axios.get<any[]>(`${BASE_URL}/api/carrousel`);
};