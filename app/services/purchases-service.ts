import axios from 'axios';
import { NEXT_PUBLIC_PROXY, API_BASE_URL }  from './config';
import { Purchase, PurchasePayload }  from '../types/purchase';

// Audio Services
export const createPurchase = async (purchaseData: PurchasePayload) => {
    console.log(purchaseData)

    return axios.post(`${API_BASE_URL}/purchases`, purchaseData);
};

export const getAllPurchases = async () => {
    return axios.get<Purchase[]>(`${NEXT_PUBLIC_PROXY}/purchases`);
};

export const getPurchaseById = async (id: string) => {
    const url = `${NEXT_PUBLIC_PROXY}/purchases/${id}`

    return axios.get<Purchase>(url);
};

export const getPurchasesAudioByBuyer = async (id: string) => {
    return axios.get<Purchase>(`${NEXT_PUBLIC_PROXY}/purchases/buyer/${id}`);
};

export const createPurchaseServer = async (purchaseData: PurchasePayload) => {
    return axios.post(`${API_BASE_URL}/purchases`, purchaseData);
};

export const getAllPurchasesServer = async () => {
    return axios.get<Purchase[]>(`${NEXT_PUBLIC_PROXY}/purchases`);
};

export const getPurchaseByIdServer = async (id: string) => {
    const url = `${NEXT_PUBLIC_PROXY}/purchases/${id}`

    return axios.get<Purchase>(url);
};

export const getPurchasesAudioByBuyerServer = async (id: string) => {
    return axios.get<Purchase>(`${NEXT_PUBLIC_PROXY}/purchases/buyer/${id}`);
};