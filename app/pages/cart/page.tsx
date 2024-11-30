'use client'

import storage from "local-storage-fallback";
import { AudioDB } from "../../types/audio";
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Purchase from "../../components/cart/PurchaseResume";
import { getAudioById } from "@/app/services/audio-service";
import { createPurchase } from "@/app/services/purchases-service";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { User } from "@/app/types/users";
import { Item, PurchasePayload } from "@/app/types/purchase";
import { USER } from '../../mocks/User';
import { AUDIOS } from '../../mocks/Audio';
import withAuth from "@/app/hoc/withAuth";

const mockUser: User = USER
const mockAudios = AUDIOS

const retrieveAudios = () => {
  let audiosIDs = storage.getItem("selected_audios");

  if (audiosIDs == null) {
    audiosIDs = "";
  }

  return audiosIDs.split(",");
};

const buildPayload = (audios: any[], ID: string): PurchasePayload => {
  let purchase = {
    buyer_ID: ID,
    flow_type: "credit",
    payment_method: "mercadopago",
    items: buildItems(audios)
  }

  console.log(purchase)

  return purchase
}

const buildItems = (audios: AudioDB[]) => {
  const items: Item[] = []

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


const Cart = () => {
  const [audios, setAudios] = useState<AudioDB[]>(mockAudios); //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Obtener los audios desde la API al cargar el componente
    const fetchAudios = async () => {
      let audios: AudioDB[] = [];
      const audioIDs = retrieveAudios();

      /*
      try {
        audioIDs.forEach(async (id) => {
          let response = await getAudioById(id);
          audios.push(response.data);

        });

        console.log(audios)

        setAudios(audios); // Guardamos los audios de la API en el estado
      } catch (error) {
        console.error("Error al obtener los audios:", error);
      }*/
    };

  }, []);

  const handlePurchase = async () => {
    const response = await createPurchase(buildPayload(audios, mockUser.ID))

    console.log(response)

    setIsModalOpen(false);

    router.push("/pages/checkout");
  };


  const handleCheckout = () => {
    router.push("/pages/checkout");
  };

  return (
    <div>
      <div>
        <Header title="Carrito" />
      </div>
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0" >
        <div className="flex flex-col w-[1000px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/*Carrito*/}
            <div className="flex flex-col mt-5">

              <Purchase items={audios}></Purchase>

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




