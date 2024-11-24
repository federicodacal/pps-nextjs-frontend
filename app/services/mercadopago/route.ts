import {Payment} from "mercadopago";
import {revalidatePath} from "next/cache";

import api, {mercadopago} from "../mercadopago-api";

export async function POST(request: Request) {
  const body: {data: {id: string}} = await request.json();

  const payment = await new Payment(mercadopago).get({id: body.data.id});

  if (payment.status === "approved") {
    await api.message.add({id: payment.id!, text: payment.metadata.text});

    revalidatePath("/");
  }

  return new Response(null, {status: 200});
}