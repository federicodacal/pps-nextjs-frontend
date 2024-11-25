"use client";

import React from "react";
import storage from "local-storage-fallback";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/services/users-service";
import { UserPayload } from '../../types/users';

const subscriptionPlans = [
  {
    id: 1,
    name: "Plan Básico",
    detail: "Ideal para usuarios individuales.",
    periodicity: "Mensual",
    value: "$10",
  },
  {
    id: 2,
    name: "Plan Profesional",
    detail: "Perfecto para pequeñas empresas.",
    periodicity: "Mensual",
    value: "$30",
  },
  {
    id: 3,
    name: "Plan Corporativo",
    detail: "Diseñado para grandes organizaciones.",
    periodicity: "Anual",
    value: "$300",
  },
];

const buildUser = (userData: any) => {
  return {
    ID: userData.ID,
    pwd: userData.pwd,
    type: userData.type,
    state: userData.state,
    user_detail_ID: "N/A",
    personal_ID: Number(userData.personal_ID),
    username: userData.username,
    full_name: userData.full_name,
    phone_number: userData.phone_number,
    creator_ID: "N/A",
    profile: userData.bio,
    points: 0,
    credits: 0,
    subscription_ID: Number(userData.subscription_ID),
    account_ID: "N/A",
    personal_account_ID: "N/A",
    account_type: "cbu",
  }
}

const PlansPage = () => {
  const router = useRouter();
  const handleSelectPlan = (plan: (typeof subscriptionPlans)[0]) => {
    storage.setItem("selectedPlan", plan.id.toString());
    console.log(`Has seleccionado el ${plan.name}`);
  };

  const handlePlanSelection = async () => {
    let dataPrefix = "user_"

    const userData = {
      ID: storage.getItem(`${dataPrefix}ID`),
      email: storage.getItem(`${dataPrefix}email`),
      username: storage.getItem(`${dataPrefix}username`),
      full_name: storage.getItem(`${dataPrefix}full_name`),
      dni: storage.getItem(`${dataPrefix}dni`),
      phone: storage.getItem(`${dataPrefix}phone`),
      pwd: storage.getItem(`${dataPrefix}pwd`),
      type: storage.getItem(`${dataPrefix}type`),
      personal_ID: storage.getItem(`${dataPrefix}personal_ID`),
      state: storage.getItem(`${dataPrefix}state`),
      user_detail_ID: storage.getItem(`${dataPrefix}user_detail_ID`),
      plan_id: storage.getItem("selectedPlan"),
    }
    
    await createUser(buildUser(userData)).then(() => {
      router.push("/pages/user-register");
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">Planes de Suscripción</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 max-w-5xl">
        {subscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-400 mb-2">{plan.detail}</p>
              <p className="mb-2">
                <span className="font-semibold">Periodicidad:</span>{" "}
                {plan.periodicity}
              </p>
              <p>
                <span className="font-semibold">Valor:</span> {plan.value}
              </p>
            </div>
            <button
              onClick={() => handleSelectPlan(plan)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Seleccionar Plan
            </button>
          </div>
        ))}
      </div>
      <div className="min-h-screen bg-gray-900 text-white flex flex-rows items-center">
        <button
          onClick={() => router.back}
          className="mt-4 bg-gray-600 hover:bg-purple-700 text-white font-bold py-5 px-6 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={() => handlePlanSelection()}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-6 rounded"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default PlansPage;
