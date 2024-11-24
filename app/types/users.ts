export interface User {
    ID: string;
    email: string;
    pwd: string;
    type: 'Comprador' | 'Creador';
    subscription_ID: string;
    credits: number;
    token: string;
    state:string;
    user_detail: UserDetail;
}

interface UserDetail{
    ID:string;
    username: string;
    full_name:string;
    personal_ID: string;
    phone_number: string;
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

export interface UserData {
    ID: string | null ;
    username: string | null;
    full_name: string | null;
    pwd: string | null;
    personal_ID: string | null;
    type: string | null;
    state: string | null;
    subscription_ID: string | null;
}