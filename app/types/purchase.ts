import { Audio } from './audio';

export interface Purchase {
    buyer_ID: string
    flow_type: string
    payment_method: string
    items: Item[]
  }
  
  export interface Item {
    item_ID: string
    audio_ID: string
    creator_ID: string
    price: number
  }
export interface PurchasePayload {
    buyer_id: string;
    flow_type: string;
    payment_method: string;
    items: Item[];
}