import { redirect } from "next/navigation";

import api from "@/app/services/mercadopago-api";
import { cookies } from 'next/headers';
import { getPurchaseById } from "@/app/services/purchases-service"
import storage from "local-storage-fallback";
import { Item, Purchase, CheckoutItem, CheckoutData } from "@/app/types/purchase";
import { PURCHASE } from '../../mocks/Purchase';
import React, { useEffect, useState } from 'react';
import { useSessionStorage } from '@/app/hooks/useSessionStorage';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';


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
    <div className="grid gap-8 m-auto">
      <div>
        <Header title="Resumen de compra" />
      </div>
      <form action={add} className="grid gap-2">
        <div className="min-h-screen bg-black text-violet-200 flex flex-col items-center w-full">
          {itemsData.items.map((item: any, index: number) => (
            <div key={index} className="bg-purple-800 p-6 mb-5  shadow-md w-full max-w-md">
              <p>Audio: {item.audio_name}</p>
              <p>Precio: {item.price}</p>
            </div>
          ))}
          <button className="rounded bg-blue-400 p-4 w-full max-w-96" type="submit">
            Pagar
          </button>
        </div>

      </form>
      <div>
        <Footer />
      </div>

    </div>
  );
}