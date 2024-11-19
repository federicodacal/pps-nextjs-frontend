export interface User {
    id: string;
    username: string;
    email: string;
    type: 'Comprador' | 'Creador';
    token: string;
}

export interface UserPayload {
    ID: string | null ;
    username: string | null;
    email: string | null;
    full_name: string | null;
    pwd: string | null;
    personal_ID: string | null;
    type: string | null;
    state: string | null;
    user_detail_ID: string | null;
    plan_id: string | null;
}