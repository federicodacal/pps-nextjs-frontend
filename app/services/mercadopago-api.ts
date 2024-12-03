import { MercadoPagoConfig, Preference } from "mercadopago";
import { Item, Purchase, CheckoutItem, CheckoutData, PurchasePayload } from "@/app/types/purchase";

export const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

interface PaymentPayload {
  id: string,
  unit_price: number,
  quantity: number,
  title: string,
}

interface Message {
  id: number;
  text: string;
}

const api = {
  message: {

    async add(payment: PurchasePayload): Promise<void> {
      // Obtenemos los mensajes
      // Crear Purchase
 
    },

    async submit(checkoutdata: CheckoutData, metadata: string) {
      const payload: PaymentPayload[] = []

      checkoutdata.items.forEach((item,index)=> {
        payload.push({
          id: item.id,
          unit_price: item.price,
          quantity: 1,
          title: `Item N° ${index+1}`,
        })
      });

      const preference = await new Preference(mercadopago).create({
        body: {
          items: payload,
          auto_return:"approved",
          back_urls: {
            success: "http://localhost:3000//pages/payment",
          
          },
          metadata: {
            metadata,
          },
        },
      });

      return preference.init_point!;
    },
  },
};

export default api;