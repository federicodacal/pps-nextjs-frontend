"use client";

import { useState } from "react";
import { getAllAudios, getAudioById } from "../../services/audio-service";
import { getUserById } from "../../services/users-service";
import { getAllPurchases } from "../../services/purchases-service";

export default function TestPage() {
  const [data, setData] = useState<any>(null);

  const handleGetAllAudios = async () => {
    const result = await getAllAudios();
    setData(result);
  };

  const handleGetAudioById = async () => {
    const result = await getAudioById("1"); // Cambiar "1" por un ID real
    setData(result);
  };

  const handleGetUserById = async () => {
    const result = await getUserById("1"); // Cambiar "1" por un ID real
    setData(result);
  };

  const handleGetBuyerPurchases = async () => {
    const result = await getAllPurchases();
    setData(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-4 p-6">
      <h1 className="text-3xl font-bold mb-8">TEST Page</h1>

      <button
        onClick={handleGetAllAudios}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get All Audios
      </button>

      <button
        onClick={handleGetAudioById}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Audio By ID
      </button>

      <button
        onClick={handleGetUserById}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User By ID
      </button>

      <button
        onClick={handleGetBuyerPurchases}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Buyer Purchases
      </button>

      <div className="mt-8">
        <pre className="bg-gray-800 p-4 rounded">
          {data && JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
