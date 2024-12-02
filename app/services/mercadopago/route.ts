import { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";

import { getPurchaseById } from "@/app/services/purchases-service"
import api, { mercadopago } from "../mercadopago-api";
import { cookies } from 'next/headers';


export async function POST(request: Request) {
  const body: { data: { id: string } } = await request.json();
  const payment = await new Payment(mercadopago).get({ id: body.data.id });

  if (payment.status === "approved") {
    // Actualizar Purchase en DB
    
    revalidatePath("/");
  }

  return new Response(null, { status: 200 });
}