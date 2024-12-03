import axios from 'axios';
import { NEXT_PUBLIC_PROXY }  from './config';
import { User, UserPayload }  from '../types/users';


// User Services
export const createUser = async ( userData: UserPayload) => {
    console.log(userData)

    const response = axios.post(`${NEXT_PUBLIC_PROXY}/users`, userData);

    return response
};

export const getUserById = async (id: string) => {
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
