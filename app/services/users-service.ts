import axios from 'axios';
import { PROXY, API_BASE_URL }  from './config';
import { User, UserPayload }  from '../types/users';

const DEV_URL = 'http://127.0.0.1:5000';

// User Services
export const createUser = async ( userData: UserPayload) => {
    console.log('User data desde service: ', userData)

    const response = axios.post(`${API_BASE_URL}/users`, userData);

    return response
};

export const getUserById = async (id: string) => {
    return axios.get<User>(`${API_BASE_URL}/users/${id}`);
};

export const getUsers = async () => {
    return axios.get<User[]>(`${API_BASE_URL}/users`);
};

export const updateUser = async (userData: UserPayload) => {
    console.log('Update user: ', userData)
    const response = axios.put(`${API_BASE_URL}/users/${userData.ID}`, userData);

    return response
};

export const deleteByID = async (userId: string) => {
    console.log(userId)

    const response = axios.delete(`${API_BASE_URL}/users/${userId}`);

    return response
};
