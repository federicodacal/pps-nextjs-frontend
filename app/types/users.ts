export interface UserPayload {
    ID: string
    pwd: string
    type: string
    state: string
    user_detail_ID: string
    personal_ID: number
    username: string
    full_name: string
    phone_number: string
    creator_ID: string
    profile: string
    points: number
    credits: number
    subscription_ID: number
    account_ID: string
    personal_account_ID: string
    account_type: string
}

export interface User {
    ID: string
    created_at: string
    creator: Creator 
    email: string
    modified_at: string
    pwd: string
    type: string
    user_detail: UserDetail
    user_detail_ID: string
    state: string
}

export interface Creator {
    ID: string
    created_at: string
    credits: number
    modified_at: string
    points: number
    profile: string
    state: string
    subscription_ID: number
    user_ID: string
}

export interface UserDetail {
    ID: string
    created_at: string
    full_name: string
    modified_at: string
    personal_ID: number
    phone_number: string
    username: string
}