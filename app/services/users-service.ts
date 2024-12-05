import axios from 'axios';
import { NEXT_PUBLIC_PROXY, API_BASE_URL }  from './config';
import { User, UserPayload }  from '../types/users';

const DEV_URL = 'http://127.0.0.1:5000';

// User Services
export const createUser = async ( userData: UserPayload) => {
    console.log('User data desde service: ', userData)

    const response = axios.post(`${NEXT_PUBLIC_PROXY}/users`, userData);

    return response
};

export const getUserById = async (id: string) => {
    return axios.get<User>(`${API_BASE_URL}/users/${id}`);
};

export const getUserByIdServer = async (id: string) => {
    return axios.get<User>(`${NEXT_PUBLIC_PROXY}/users/${id}`);
};

export const getUsers = async () => {
    return axios.get<User[]>(`${NEXT_PUBLIC_PROXY}/users`);
};

export const updateUser = async (userData: UserPayload) => {
    const response = axios.put(`${NEXT_PUBLIC_PROXY}/users/${userData.ID}`, userData);

    return response
};

export const deleteByID = async (userId: string) => {
    const response = axios.delete(`${NEXT_PUBLIC_PROXY}/users/${userId}`);

    return response
};

export const refuseByID = async (userId: string) => {
    const response = axios.delete(`${NEXT_PUBLIC_PROXY}/users/approval/${userId}`);

    return response
};

export const approveByID = async (userId: string) => {
    const response = axios.post(`${NEXT_PUBLIC_PROXY}/users/approval/${userId}`);

    return response
};

export const inactiveCreatorByID = async (userId: string) => {
    const response = axios.delete(`${NEXT_PUBLIC_PROXY}/users/creator/${userId}`);

    return response
};

export const activeCreatorByID = async (userId: string) => {
    const response = axios.post(`${NEXT_PUBLIC_PROXY}/users/creator/${userId}`);

    return response
};