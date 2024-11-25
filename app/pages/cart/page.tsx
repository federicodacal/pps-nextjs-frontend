'use client'

import storage from "local-storage-fallback";
import { Audio } from "../../types/audio";
import Purchase from "../../components/cart/PurchaseResume";
import { getAudioById } from "@/app/services/audio-service";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { AUDIOS } from '../../mocks/Audio';

const audiosMock = AUDIOS;

const retrieveAudios = () => {
  let audiosIDs = storage.getItem("selected_audios");

  if (audiosIDs == null) {
    audiosIDs = "";
  }

  return audiosIDs.split(",");
};

export default function Cart() {
  const [audios, setAudios] = useState<any[]>(audiosMock);
  const router = useRouter();

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

  const handleCheckout = () => {
    router.push("/pages/checkout");
  };

  return (
    <>
      <div className="min-h-screen bg-black text-violet-200 flex flex-col items-center w-full">
        <div>
          <h1 className="text-3xl font-bold ">Carrito</h1>
        </div>
        <div className="flex justify-between mt-10">
          <Purchase items={audios}></Purchase>
        </div>


      </div>

      <div className="flex justify-between mt-5">
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 "
          onClick={() => handleCheckout()}
        >
          Confirmar
        </button>
      </div>

    </>
  );
}
