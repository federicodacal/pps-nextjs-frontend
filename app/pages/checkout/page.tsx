import { redirect } from "next/navigation";

import api from "@/app/services/mercadopago-api";
import { cookies } from 'next/headers';
import { getPurchaseById } from "@/app/services/purchases-service"
import storage from "local-storage-fallback";
import { Item, Purchase, CheckoutItem, CheckoutData } from "@/app/types/purchase";
import { PURCHASE } from '../../mocks/Purchase';
import React, { useEffect, useState } from 'react';
import { useSessionStorage } from '@/app/hooks/useSessionStorage';


const mockPurchase = PURCHASE

/*async function add(purchase: Purchase) {

  let items = buildCheckoutItems(purchase)
  let metadata = buildMetadata(purchase)

  const url = await api.message.submit(items, metadata)

  console.log(url)

  redirect(url);
}*/



const retrievePurchaseID = () => {
  let purchaseID = storage.getItem("purchase_ID");

  if (purchaseID == null) {
    purchaseID = "";
  }

  return purchaseID
};




// Page
export default async function Checkout() {
  const cookieStore = cookies();
  const data = cookieStore.get('itemsData')?.value;
  const itemsData = data ? JSON.parse(data) : { userId: 'N/A', name: 'N/A' };
  //const [metadata] = useSessionStorage<string>('purchase_metadata', "");

  async function add(formData: FormData) {
    "use server";

    console.log(data)
    console.log(itemsData)

    const url = await api.message.submit(
      itemsData, 
      ""
    );

    redirect(url);
  }

  return (
    <section className="grid gap-8">
      <form action={add} className="grid gap-2">
        <textarea
          className="border-2 border-blue-400 p-2"
          name="text"
          placeholder="Hola perro"
          rows={3}
        />
        <button className="rounded bg-blue-400 p-2" type="submit">
          Enviar
        </button>
      </form>

    </section>
  );
}