import axios from 'axios';
import { NEXT_PUBLIC_PROXY, API_BASE_URL }  from './config';

const DEV_URL = 'http://127.0.0.1:5000'

export const getSubscriptions = async () => {
    return axios.get<any[]>(`${NEXT_PUBLIC_PROXY}/subscriptions`);
};

export const checkCreatorDebt = async (creatorId: string) => {
    const response = axios.get(`${NEXT_PUBLIC_PROXY}/subscriptions/creator/${creatorId}`);

    return response
};