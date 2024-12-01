import { MercadoPagoConfig, Preference } from "mercadopago";
import { Item, Purchase, CheckoutItem, CheckoutData } from "@/app/types/purchase";

export const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

interface PaymentPayload {
  id: string,
  unit_price: number,
  quantity: number,
  title: string,
}

const api = {
  message: {

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

      console.log(checkoutdata)
      console.log(process.env.MP_ACCESS_TOKEN)
      console.log(mercadopago)


      const preference = await new Preference(mercadopago).create({
        body: {
          items: payload,
          auto_return:"approved",
          back_urls: {
            success: "https://4nctst49-3000.brs.devtunnels.ms/pages/checkout",
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