import { Audio } from './audio';

export interface Purchase {
  ID: string
  buyer_ID: string
  created_at: string
  flow_type: string
  modified_at: string
  payment_method: string
  purchase_details: PurchaseDetail[]
  state: string
  total: number
}

export interface PurchaseDetail {
  ID: string
  created_at: string
  item: Item
  item_ID: string
  modified_at: string
  purchase_ID: string
  state: string
}

export interface Item {
  ID: string
  audio_ID: string
  created_at: string
  creator_ID: string
  modified_at: string
  price: number
  state: string
}

export interface ItemPayload {
  item_ID: string
  audio_ID: string
  creator_ID: string
  price: number
}

export interface PurchasePayload {
  buyer_ID: string
  flow_type: string
  payment_method: string
  items: ItemPayload[]
}

export interface CheckoutData {
  items: CheckoutItem[]
}

export interface CheckoutItem {
  id: string;
  audio_name:string;
  price: number;
}

export interface Creator {
  username: string
}
