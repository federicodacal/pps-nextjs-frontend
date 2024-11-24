import { Audio } from './audio';

export interface Purchase {
    id: string;
    created_at: string;
    total_price: number;
    payment_method: string;
    status: string;
    audios: Audio[];
}

export interface Item {
    id: string;
    audio_id: string;
    price: number;
    status: string;
}

export interface PurchasePayload {
    buyer_id: string;
    flow_type: string;
    payment_method: string;
    items: Item[];
}