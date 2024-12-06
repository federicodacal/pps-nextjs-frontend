"use client";

import React, { useEffect, useState } from "react";
import storage from "local-storage-fallback";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/services/users-service";
import { getSubscriptions } from "@/app/services/subscriptions-service";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";

type SubscriptionPlan = {
  id: number;
  name: string;
  detail: string;
  //periodicity: string;
  value: string;
};

const buildUser = (userData: any) => {
  return {
    ID: userData.ID,
    email: userData.email,
    pwd: userData.pwd,
    type: userData.type,
    state: userData.state,
    user_detail_ID: "N/A",
    personal_ID: Number(userData.personal_ID),
    username: userData.username,
    full_name: userData.full_name,
    phone_number: userData.phone_number,
    creator_ID: "N/A",
    profile: userData.profile,
    points: 0,
    credits: 0,
    subscription_ID: Number(userData.subscription_ID),
    account_ID: "N/A",
    personal_account_ID: userData.personal_account_ID,
    account_type: userData.account_type,
  };
};

const PlansPage = () => {
  const router = useRouter();
  const [subscriptionPlans, setSubscriptionPlans] = React.useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [accountType, setAccountType] = useState("cbu");
  const [accountId, setAccountId] = useState("");
  const [confirmAccountId, setConfirmAccountId] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getSubscriptions();
        const plans = response.data.map((plan) => ({
          id: plan.id,
          name: plan.titulo,
          detail: `Duración: ${plan.duracion_dias} días`,
          value: `$${plan.precio}`,
        }));
        setSubscriptionPlans(plans);
      } catch (error) {
        console.error("Error al obtener los planes de suscripción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlanId(plan.id);
    storage.setItem("selectedPlan", plan.id.toString());
    console.log(`Has seleccionado el ${plan.name}, id: ${plan.id}`);
  };

  const handlePlanSelection = async () => {
    if (!selectedPlanId || !accountId || !confirmAccountId || !bio) {
      alert("Por favor, complete todos los campos antes de confirmar.");
      return;
    }

    if (accountId !== confirmAccountId) {
      alert("El CBU/CVU no coincide.");
      return;
    }

    const dataPrefix = "user_";

    const userData = {
      //ID: storage.getItem(`${dataPrefix}ID`),
      email: storage.getItem(`${dataPrefix}email`),
      username: storage.getItem(`${dataPrefix}username`),
      full_name: storage.getItem(`${dataPrefix}full_name`),
      //dni: storage.getItem(`${dataPrefix}dni`),
      phone_number: storage.getItem(`${dataPrefix}phone`),
      pwd: storage.getItem(`${dataPrefix}pwd`),
      type: storage.getItem(`${dataPrefix}type`),
      personal_ID: storage.getItem(`${dataPrefix}personal_ID`),
      //state: storage.getItem(`${dataPrefix}state`),
      //user_detail_ID: storage.getItem(`${dataPrefix}user_detail_ID`),
      subscription_ID: selectedPlanId,
      account_type: accountType,
      personal_account_ID: accountId,
      //confirm_account_id: confirmAccountId,
      profile: bio,
    };

    console.log('User data:');
    console.log(userData);

    await createUser(buildUser(userData)).then(() => {
      router.push("/pages/user-register");
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Cargando planes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <Header title="Planes de Suscripción"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 max-w-5xl">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="font-semibold mb-2">{plan.detail}</p>
              <p>
                <span className="font-semibold">Valor:</span> {plan.value}
              </p>
            </div>
            <button
              onClick={() => handleSelectPlan(plan)}
              className={`mt-4 font-bold py-2 px-4 rounded ${selectedPlanId === plan.id
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
            >
              {selectedPlanId === plan.id ? "Seleccionado" : "Seleccionar Plan"}
            </button>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md mt-8">
        <label className="block mb-2 font-bold">Seleccione un medio de cobro:</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
        >
          <option value="cbu">CBU</option>
          <option value="cvu">CVU</option>
        </select>

        <label className="block mb-2 font-bold">
          Ingrese {accountType.toUpperCase()}:
        </label>
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
        />

        <label className="block mb-2 font-bold">
          Confirme {accountType.toUpperCase()}:
        </label>
        <input
          type="text"
          value={confirmAccountId}
          onChange={(e) => setConfirmAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
        />

        <label className="block mb-2 font-bold">Biografía de usuario:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
          rows={4}
        />

        <button
          onClick={handlePlanSelection}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirmar
        </button>
        <button
          onClick={() => router.back()}
          className="w-full bg-gray-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2"
        >
          Cancelar
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default PlansPage;

