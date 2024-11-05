import axios from 'axios';
import { PROXY }  from './config';
import { User, UserPayload }  from '../types/users';


// User Services
export const createUser = async (userData: UserPayload) => {
    return axios.post(`${PROXY}/users`, userData);
};

export const getUserById = async (id: string) => {
    return axios.get<User>(`${PROXY}/users/${id}`);
};