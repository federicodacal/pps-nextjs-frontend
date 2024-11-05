export interface User {
    id: string;
    username: string;
    email: string;
    type: 'Comprador' | 'Creador';
    token: string;
}

export interface UserPayload {
    username: string;
    email: string;
    password: string;
}