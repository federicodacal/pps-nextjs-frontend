import { redirect } from "next/navigation";

import api from "@/app/services/mercadopago-api";
import { getPurchaseById } from "@/app/services/purchases-service"
import storage from "local-storage-fallback";
import { Item, Purchase, CheckoutItem } from "@/app/types/purchase";

// Queremos que esta página sea estática, nos encargaremos de revalidar los datos cuando agreguemos un nuevo mensaje
export const dynamic = "force-static";

const retrievePurchaseID = () => {
  let purchaseID = storage.getItem("purchase_ID");

  if (purchaseID == null) {
    purchaseID = "";
  }

  return purchaseID
};


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

export default async function Checkout() {

  async function add(formData: FormData) {
    "use server";

    let purchaseID = retrievePurchaseID()
    const response = await getPurchaseById(purchaseID)
    let items = buildCheckoutItems(response.data)
    let metadata = buildMetadata(response.data)

    const url = await api.message.submit(items, metadata);

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