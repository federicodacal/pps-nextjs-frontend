import { redirect } from "next/navigation";

import api from "@/app/services/mercadopago-api";
import { cookies } from 'next/headers';
import { getPurchaseById } from "@/app/services/purchases-service"
import storage from "local-storage-fallback";
import { Item, Purchase, CheckoutItem, CheckoutData } from "@/app/types/purchase";
import { PURCHASE } from '../../mocks/Purchase';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {
  SiMercadopago,
} from "react-icons/si";
import {
  FaCcMastercard,
} from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { getAudioById, getAudioByIdServer } from "@/app/services/audio-service";
import { AudioDB } from "../../types/audio";


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

  console.log(itemsData)
  //const [metadata] = useSessionStorage<string>('purchase_metadata', "");

  async function add(formData: FormData) {
    "use server";

    const url = await api.message.submit(
      itemsData,
      ""
    );

    redirect(url);
  }

  return (
    <div className="grid gap-8 m-auto border-x-indigo-950">
      <div>
        <Header title="Resumen de compra" />
      </div>
      <div className="flex flex-col col-auto m-auto gap-5">
        <span className="mt-10 text-sm">Los pagos se procesarán por medio de la plataforma externa</span>
        <div className="flex flex-row gap-10 place-content-center">
          <span><SiMercadopago size={40} /></span>
          <span><FaCcMastercard size={40}/></span>
          <span><FaRegCreditCard size={40}/></span>
        </div>

      </div>
      <form action={add} className="grid gap-2">
        <div className="h-full text-violet-200 flex flex-col items-center w-full m-auto">
          {itemsData.items.map((item: any, index: number) => (
            <div key={index} className="bg-slate-700 p-6 mb-5  shadow-md w-full max-w-md flex gap-5 place-content-center">
              <p>Audio: {item.audio_name}</p>
              <p>Precio: $ {item.price}</p>
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