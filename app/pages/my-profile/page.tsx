'use client'

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID, getUserByIdServer } from '@/app/services/users-service';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { UserPayload } from '../../types/users';
import withAuth from '@/app/hoc/withAuth';
import { useAuth } from '@/app/contexts/AuthContext';
import { getPurchasesAudioByBuyer } from '@/app/services/purchases-service';
import { Purchase, PurchaseDetail } from '@/app/types/purchase';
import UserDetail from '@/app/components/user-form/UserDetail';
import { profile } from 'console';
import DownloadList from '@/app/components/audio/DownloableAudio';
import { UserForm } from '@/app/types/users'
import UploadedAudios from '@/app/components/audio/UploadedAudios';

//const hardcodedUser = 'caa20840-36bd-4e7e-8599-f32ed1c2d646'

interface DownloableAudio {
  ID: string;
  audio_name: string | undefined;
  file_url: string | undefined;
  genre: string | undefined;
  BPM: number | undefined;
  category: string | undefined;
  size: number | undefined;
}

const initUser = () => {
  return {
    ID: "",
    full_name: "",
    personal_ID: 0,
    username: "",
    email: "",
    phone_number: "",
    pwd: "",
    credits: 0,
    type: "",
    subscription_ID: "",
    profile: "",
    state: "",
    account_type: "",
    account_id: "",
  }
}

const initAudio = () => {
  return [{
    ID: "",
    audio_name: "",
    file_url: "",
    genre: "",
    BPM: 0,
    category: "",
    size: 0,
  }]
}

const buildUser = (response: any) => {
  let user = {
    ID: response.data.ID,
    full_name: response.data.user_detail.full_name,
    personal_ID: response.data.user_detail.personal_ID,
    username: response.data.user_detail.username,
    email: response.data.email,
    phone_number: response.data.user_detail.phone_number,
    pwd: response.data.pwd,
    credits: response.data.creator?.credits,
    type: response.data.type,
    subscription_ID: response.data.creator?.subscription_ID,
    profile: response.data.creator?.profile,
    state: response.data.state,
    account_type: response.data.creator?.account_type,
    account_id: response.data.creator?.personal_account_ID
  }

  console.log("Datos del usuario:", user);

  return user
}

const buildPurchases = (response: any) => {
  let purchases: Purchase[] = []

  response.data.forEach((purchase: Purchase) => {
    purchases.push({
      ID: purchase.ID,
      buyer_ID: purchase.buyer_ID,
      created_at: purchase.created_at,
      flow_type: purchase.flow_type,
      modified_at: purchase.modified_at,
      payment_method: purchase.payment_method,
      purchase_details: purchase.purchase_details,
      state: purchase.state,
      total: purchase.total
    })
  });

  return purchases
}

const getAudios = (purchases: Purchase[]) => {
  let audios: DownloableAudio[] = []

  purchases.forEach((purchase) => {
    purchase.purchase_details.forEach((detail: PurchaseDetail) => {
      audios.push({
        ID: detail.item.audio_ID,
        audio_name: detail.item.audio?.audio_name,
        file_url: detail.item.audio?.file_url,
        genre: detail.item.audio?.genre,
        BPM: detail.item.audio?.BPM,
        category: detail.item.audio?.category,
        size: detail.item.audio?.size,
      })
    })
  });

  return audios
}

const MyProfile = () => {
  const [user, setUserData] = useState<UserForm>(initUser());
  const [audios, setAudioData] = useState<DownloableAudio[]>(initAudio());
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await getUserByIdServer(userId);

          setUserData(buildUser(response));
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }

      try {
        if (userId) {
          const responsePurchases = await getPurchasesAudioByBuyer(userId)

          console.log("Datos de compras:", responsePurchases.data);
          setAudioData(getAudios(buildPurchases(responsePurchases)));
        }
        setUserData(user);

      } catch (error) {
        console.error("Error al obtener datos del compras:", error);
      }
    };

    fetchUserData();

  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Title */}
      <Header title="Mi perfil" />

      <div className="flex flex-auto gap-8 m-auto p-5">
        {/* Credits */}
        {user?.credits !== undefined && user?.type == 'creator' ? (

          <div className="absolute mb-5 mr-5 mt-48 top-1 right-1 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg text-lg">
            Créditos: {user.credits}
          </div>
        ) : (
          <></>
        )}
        <UserDetail userForm={user} />
        {audios.length > 0 && audios[0].ID != "" ? (
          <DownloadList audios={audios} />
        ) : (
          <></>
        )}
        {
          user.type == "creator" ?
            <UploadedAudios audios={audios} /> :
            <></>
        }

      </div>
      <Footer />
    </div>
  );
}

export default withAuth(MyProfile, ["creator", "buyer"]);