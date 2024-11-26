'use client'

import storage from "local-storage-fallback";
import { Audio } from "../../types/audio";
import Purchase from "../../components/cart/PurchaseResume";
import { getAudioById } from "@/app/services/audio-service";
import { createPurchase } from "@/app/services/purchases-service";
import React, { useEffect, useState } from 'react';
import { User } from "@/app/types/users";
import { Item, PurchasePayload } from "@/app/types/purchase";
import { USER }  from '../../mocks/User';

const mockUser: User = USER

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
    flow_type: "",
    payment_method: "mercadopago",
    items: buildItems(audios)
  }

  return purchase
}

const buildItems = (audios: Audio[]) => {
  const items: Item[] = []

  audios.forEach(audio => {
    items.push({
      item_ID: "",
      audio_ID: audio.ID,
      creator_ID: audio.creator_ID,
      price: Number(audio.price)
    })
  });

  return items
}


export default function Cart() {
  const [audios, setAudios] = useState<any[]>([]); //
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Obtener los audios desde la API al cargar el componente
    const fetchAudios = async () => {
      let audios: Audio[] = [];
      /*const audioIDs = retrieveAudios();

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

    fetchAudios();
  }, []);

  const handlePurchase = async () => {
    const response = createPurchase(buildPayload(audios, mockUser.ID))

    console.log(response)

    setIsModalOpen(false);
  };


  const handleCheckout = () => {
    router.push("/pages/checkout");
  };

  return (
    <>
      <div>

      </div>
      <Purchase items={audios}></Purchase>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
        >
          Baja de usuario
        </button>
      </div>
      <div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-lg mb-4">¿Estás seguro de eliminar tu cuenta?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePurchase}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
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
    </>
  );
}




