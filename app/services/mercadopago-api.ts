import {readFileSync, writeFileSync} from "node:fs";

import {MercadoPagoConfig, Preference} from "mercadopago";

interface Message {
  id: number;
  text: string;
}

export const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

const api = {
  message: {
    async list(): Promise<Message[]> {
      const db = readFileSync("db/message.db");

      return JSON.parse(db.toString());
    },
    async add(message: Message): Promise<void> {
      const db = await api.message.list();

      if (db.some((_message) => _message.id === message.id)) {
        throw new Error("Message already added");
      }

      const draft = db.concat(message);

      writeFileSync("db/message.db", JSON.stringify(draft, null, 2));
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