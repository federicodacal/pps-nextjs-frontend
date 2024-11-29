import {readFileSync, writeFileSync} from "node:fs";

import { Item, Purchase, PurchaseDetail } from "@/app/types/purchase";
import {MercadoPagoConfig, Preference} from "mercadopago";
import { getPurchaseById } from "@/app/services/purchases-service"
import storage from "local-storage-fallback";

interface Message {
  id: number;
  text: string;
}

interface CheckoutItem {
  id: string;
  price: number;
}

const retrievePurchaseID = () => {
  let purchaseID = storage.getItem("purchase_ID");

  if (purchaseID == null) {
    purchaseID = "";
  }

  return purchaseID
};

const buildCheckoutItems = (purchase:Purchase) => {
  let items: CheckoutItem[] = []

  purchase.purchase_details.forEach(item => {
    items.push({
      id: item.ID,
      price: item.item.price,
    })
  });

  return items
}

export const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

const api = {
  message: {
    async list(): Promise<CheckoutItem[]> {
      let purchaseID = retrievePurchaseID()
      const response = await getPurchaseById(purchaseID)
      return buildCheckoutItems(response.data)
    },

    async add(message: Message): Promise<void> {
      const db = await api.message.list();



    },

    async submit(text: Message["text"]) {
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "message",
              unit_price: 100,
              quantity: 1,
              title: "Mensaje de muro",
            },
          ],
          metadata: {
            text,
          },
        },
      });

      return preference.init_point!;
    },
  },
};

export default api;