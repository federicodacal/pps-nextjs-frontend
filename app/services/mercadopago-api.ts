import { MercadoPagoConfig, Preference } from "mercadopago";
import { Item, Purchase, CheckoutItem } from "@/app/types/purchase";

export const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

interface PaymentPayload {
  id: string,
  unit_price: number,
  quantity: number,
  title: string,
}

const api = {
  message: {

    async submit(items: CheckoutItem[], metadata: string) {
      const payload: PaymentPayload[] = []

      items.forEach((item,index)=> {
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