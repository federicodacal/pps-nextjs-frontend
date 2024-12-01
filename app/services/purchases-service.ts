import axios from 'axios';
import { PROXY }  from './config';
import { Purchase, PurchasePayload }  from '../types/purchase';

// Audio Services
export const createPurchase = async (purchaseData: PurchasePayload) => {
    console.log(purchaseData)
    return axios.post(`${PROXY}/purchases`, purchaseData);
};

export const getAllPurchases = async () => {
    return axios.get<Purchase[]>(`${PROXY}/purchases`);
};

export const getPurchaseById = async (id: string) => {
    console.log(id)

    const url = `https://pps-flask-api.vercel.app/purchases/${id}`

    console.log(url)

    return axios.get<Purchase>(url);
};