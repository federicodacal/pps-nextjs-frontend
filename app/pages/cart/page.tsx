'use client'

import storage from "local-storage-fallback";
import { AudioDB } from "../../types/audio";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { getAudioById } from "@/app/services/audio-service";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { User } from "@/app/types/users";
import { ItemPayload, PurchasePayload, CheckoutItem, CheckoutData, Purchase } from "@/app/types/purchase";
import { USER } from '../../mocks/User';
import { AUDIOS } from '../../mocks/Audio';
import { PURCHASE } from '../../mocks/Purchase';
import { useSessionStorage } from '@/app/hooks/useSessionStorage';
import PurchaseResume from "@/app/components/cart/PurchaseResume";
import withAuth from "@/app/hoc/withAuth";

const mockUser: User = USER
const mockAudios = AUDIOS
const mockPurchase = PURCHASE

const retrieveAudios = () => {
  let audiosIDs = storage.getItem("selected_audios");

  if (audiosIDs == null) {
    audiosIDs = "";
  }

  return audiosIDs.split(",").sort().slice(-1);
};

const buildPayload = (audios: any[], ID: string): PurchasePayload => {
  let purchase = {
    buyer_ID: ID,
    flow_type: "standard",
    payment_method: "mercadopago",
    items: buildItems(audios)
  }

  return purchase
}

const buildItems = (audios: AudioDB[]) => {
  const items: ItemPayload[] = []

  console.log(audios)

  audios.forEach(audio => {
    items.push({
      item_ID: audio.item.ID,
      audio_ID: audio.ID,
      creator_ID: audio.item.creator_ID,
      price: audio.item.price,
    })
  });

  return items
}

const buildCheckoutItems = (audios: AudioDB[]) => {
  let items: CheckoutItem[] = []

  audios.forEach(audio => {
    items.push({
      id: audio.item.ID,
      price: audio.item.price,
      audio_name: audio.audio_name
    })
  });

  return { items: items }
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

const Cart = () => {
  const [audios, setAudios] = useState<AudioDB[]>([]); //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setItemsData] = useSessionStorage('items_data', {});
  const [, setMetadata] = useSessionStorage('purchase_metadata', {});
  const audioIDs = retrieveAudios();
  const router = useRouter();
  const itemsList = audios

  console.log(audios)

  useEffect(() => {
    const fetchAudios = async () => {
      let audiosDB: AudioDB[] = [];

      try {
        audioIDs.forEach(async (id) => {
          if (id != "") {
            let response = await getAudioById(id);
            console.log(response.data)
            audiosDB.push(response.data);

            setAudios(audiosDB);
          }

        });

        console.log(audios)
      } catch (error) {
        console.error("Error al obtener los audios:", error);
      }
    };

    fetchAudios()

  }, []);

  const handlePurchase = async () => {
    document.cookie = `itemsData=${JSON.stringify(buildPayload(audios, mockUser.ID))}; path=/`;

    //setItemsData(buildCheckoutItems(audios));
    //setMetadata(buildMetadata(mockPurchase))

    setIsModalOpen(false);

    router.push("/pages/checkout");
  };

  return (
    <div>
      <div>
        <Header title="Carrito" />
      </div>
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0" >
        <div className="flex flex-col w-[1000px]">
          <div >
            {/*Carrito*/}
            {
              audios.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex flex-col mt-5">
                    <PurchaseResume items={itemsList}></PurchaseResume>
                  </div>
                  <div>
                    {/*Items*/}
                    <div className="bg-white rounded-xl shadow-xl p-7 text-black">
                      <h2 className="text-2xl mb-2">Resumen de orden</h2>

                      <div className="grid grid-cols-2">

                        <span className="text-xl">No. Productos</span>
                        <span className="text-right">{audios.length}</span>

                        <span className="text-xl">Subtotal</span>
                        <span className="text-right">{audios.length}</span>

                        <span className="mt-5 text-2xl">Total</span>
                        <span className="text-right mt-5 text-2xl">$ 100</span>

                      </div>
                      <div className="mt-5 mb-2 w-full p-5 ">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="flex justify-center bg-yellow-500 hover:bg-yellow-400 text-black w-full p-3"
                        >
                          Realizar compra
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : <div>
                <h1>Su carrito se encuentra vacío</h1>
              </div>

            }
            {/*Checkout*/}

          </div>
        </div>
      </div>
      <div>
        <div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <p className="text-lg mb-4">¿Desea continuar con la compra?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handlePurchase}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(Cart, ["creator", "buyer"]);




