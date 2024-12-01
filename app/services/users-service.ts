import axios from 'axios';
import { PROXY }  from './config';
import { User, UserPayload }  from '../types/users';


// User Services
export const createUser = async ( userData: UserPayload) => {
    console.log(userData)

    const response = axios.post(`${PROXY}/users`, userData);

    return response
};

export const getUserById = async (id: string) => {
    return axios.get<User>(`http://127.0.0.1:5000/users/${id}`);
};

export const getUsers = async () => {
    return axios.get<User[]>(`${PROXY}/users`);
};

export const updateUser = async (userData: UserPayload) => {
    console.log('Update user: ', userData)

    const response = axios.put(`http://127.0.0.1:5000/users/${userData.ID}`, userData);

    return response
};

export const deleteByID = async (userId: string) => {
    console.log(userId)

    const response = axios.delete(`${PROXY}/users/${userId}`);

    return response
};
