import { redirect } from "next/navigation";

import api from "@/app/services/mercadopago-api";
import { getPurchaseById } from "@/app/services/purchases-service"
import storage from "local-storage-fallback";
import { Item, Purchase, CheckoutItem } from "@/app/types/purchase";
import { PURCHASE } from '../../mocks/Purchase';
import React, { useEffect, useState } from 'react';


const mockPurchase = PURCHASE

const buildCheckoutItems = (purchase: Purchase) => {
  let items: CheckoutItem[] = []

  purchase.purchase_details.forEach(item => {
    items.push({
      id: item.ID,
      price: item.item.price,
    })
  });

  return items
}

/*async function add(purchase: Purchase) {

  let items = buildCheckoutItems(purchase)
  let metadata = buildMetadata(purchase)

  const url = await api.message.submit(items, metadata)

  console.log(url)

  redirect(url);
}*/

const buildMetadata = (purchase: Purchase) => {
  let metadata: string = ""

  metadata = metadata.concat(`$BUYER_ID:${purchase.buyer_ID},`)
  metadata = metadata.concat(`$PAYMENT_METHOD:${purchase.payment_method},`)
  metadata = metadata.concat(`$TOTAL:${purchase.total},`)

  purchase.purchase_details.forEach(item => {
    metadata = metadata.concat(`{$AUDIO_ID:${item.item.audio_ID},`)
    metadata = metadata.concat(`{$CREATOR_ID:${item.item.creator_ID},`)
    metadata = metadata.concat(`{$PRICE:${item.item.price}},`)
  });

  return metadata
}

const retrievePurchaseID = () => {
  let purchaseID = storage.getItem("purchase_ID");

  if (purchaseID == null) {
    purchaseID = "";
  }

  return purchaseID
};

// Page

export default async function Checkout() {

  async function add(formData: FormData) {
    "use server";

    const url = await api.message.submit(
      buildCheckoutItems(mockPurchase), 
      buildMetadata(mockPurchase)
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