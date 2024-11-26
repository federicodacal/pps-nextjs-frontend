import { Audio } from './audio';

export interface Purchase {
<<<<<<< HEAD
    ID: string
    buyer_ID: string
    created_at: string
    flow_type: string
    modified_at: string
    payment_method: string
    state: string
    total: number
  }

  export interface PurchasePayload {
=======
>>>>>>> develop
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
<<<<<<< HEAD
  }
=======
  }
export interface PurchasePayload {
    buyer_id: string;
    flow_type: string;
    payment_method: string;
    items: Item[];
}
>>>>>>> develop
