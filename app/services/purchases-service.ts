import axios from 'axios';
import { NEXT_PUBLIC_PROXY }  from './config';
import { Purchase, PurchasePayload }  from '../types/purchase';

// Audio Services
export const createPurchase = async (purchaseData: PurchasePayload) => {
    console.log("NEW PURCHASE")
    console.log(`${NEXT_PUBLIC_PROXY}/purchases/`)
    return axios.post(`https://pps-flask-api.vercel.app/purchases`, purchaseData);
};

export const getAllPurchases = async () => {
    return axios.get<Purchase[]>(`${NEXT_PUBLIC_PROXY}/purchases`);
};

export const getPurchaseById = async (id: string) => {
    console.log(id)

    const url = `${NEXT_PUBLIC_PROXY}/purchases/${id}`

    console.log(url)

    return axios.get<Purchase>(url);
};

export const getPurchasesAudioByBuyer = async (id: string) => {
    return axios.get<Purchase>(`${NEXT_PUBLIC_PROXY}/purchases/buyer/${id}`);
};