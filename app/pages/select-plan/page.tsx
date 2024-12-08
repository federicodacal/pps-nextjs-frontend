"use client";

import React, { useEffect, useState } from "react";
import storage from "local-storage-fallback";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/services/users-service";
import { getSubscriptions } from "@/app/services/subscriptions-service";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";
import Notification from "@/app/components/notification/Notification";

type SubscriptionPlan = {
  ID: string;
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
    subscription_ID: userData.subscription_ID,
    account_ID: "N/A",
    personal_account_ID: userData.personal_account_ID,
    account_type: userData.account_type,
  };
};

const PlansPage = () => {
  const router = useRouter();
  const [subscriptionPlans, setSubscriptionPlans] = React.useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState("cbu");
  const [accountId, setAccountId] = useState("");
  const [confirmAccountId, setConfirmAccountId] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getSubscriptions();
        const plans = response.data.map((plan) => ({
          ID: plan.ID,
          name: plan.type,
          detail: `Duración: ${plan.renewal_time_in_days} días`,
          value: `$${plan.monthly_price} por mes`,
        }));

        console.log('Subscripciones:', plans);

        setSubscriptionPlans(plans);
      } catch (error) {
        console.error("Error al obtener los planes de suscripción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedPlanId) {
      newErrors.selectedPlan = "Debe seleccionar un plan de subscripción.";
    }

    if (!accountId) {
      newErrors.accountId = "El número de cuenta es obligatorio.";
    } else if (!/^\d{22}$/.test(accountId)) {
      newErrors.accountId = "El número de cuenta debe tener exactamente 22 dígitos.";
    }

    if (!confirmAccountId) {
      newErrors.confirmAccountId = "Debe confirmar el número de cuenta.";
    } else if (accountId !== confirmAccountId) {
      newErrors.confirmAccountId = "Los números de cuenta no coinciden.";
    }

    if (accountId !== confirmAccountId) {
      newErrors.confirmAccountId = "Los números de cuenta no coinciden.";
    }

    if(!bio) {
      newErrors.bio = "Debe completar una biografía de usuario.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectPlan = (plan: any) => {
    setSelectedPlanId(plan.ID);
    storage.setItem("selectedPlan", plan.ID);
    console.log(`Has seleccionado el ${plan.name}, ID: ${plan.ID}`);
  };

  const handlePlanSelection = async () => {

    if(!validate()) return;

    try {
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
    }
    catch (error:any) {
      setNotification({ message: `Ocurrió un error: ${error?.response?.data?.message || 'Por favor intente nuevamente.'}`, type: 'error' });
      console.error("Error al crear usuario:", error);
    } 
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
            key={plan.ID}
            className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{plan.name.toLocaleUpperCase()}</h2>
              <p className="font-semibold mb-2">{plan.detail}</p>
              <p>
                <span className="font-semibold">Valor:</span> {plan.value}
              </p>
            </div>
            <button
              onClick={() => handleSelectPlan(plan)}
              className={`mt-4 font-bold py-2 px-4 rounded ${selectedPlanId === plan.ID
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
            >
              {selectedPlanId === plan.ID ? "Seleccionado" : "Seleccionar Plan"}
            </button>
          </div>
        ))}
      </div>
      {errors.selectedPlan && <p className="text-red-600 font-bold mt-3 mb-1"
      style={{ fontSize: "20px" }}
    >{errors.selectedPlan}</p>}
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

        <label className="block mb-2 mt-2 font-bold">
          Ingrese {accountType.toUpperCase()}:
        </label>
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
        />
        {errors.accountId && <p className="text-red-500 font-bold">{errors.accountId}</p>}

        <label className="block mb-2 mt-2 font-bold">
          Confirme {accountType.toUpperCase()}:
        </label>
        <input
          type="text"
          value={confirmAccountId}
          onChange={(e) => setConfirmAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
        />
        {errors.confirmAccountId && <p className="text-red-500 font-bold">{errors.confirmAccountId}</p>}

        <label className="block mb-2 mt-2 font-bold">Biografía de usuario:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
          rows={4}
        />
        {errors.bio && <p className="text-red-500 font-bold">{errors.bio}</p>}

        <button
          onClick={handlePlanSelection}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Confirmar
        </button>
        <button
          onClick={() => router.back()}
          className="w-full bg-gray-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2"
        >
          Cancelar
        </button>
        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default PlansPage;

