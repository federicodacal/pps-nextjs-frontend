import axios from 'axios';
import { PROXY }  from './config';
import { Purchase, PurchasePayload }  from '../types/purchase';

// Audio Services
export const createPurchase = async (purchaseData: PurchasePayload) => {
    return axios.post(`${PROXY}/purchases`, purchaseData);
};

export const getAllPurchases = async () => {
    return axios.get<Purchase[]>(`${PROXY}/purchases`);
};

export const getPurchaseById = async (id: string) => {
    return axios.get<Purchase>(`${PROXY}/purchases/${id}`);
};