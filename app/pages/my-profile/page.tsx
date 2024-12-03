'use client'

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
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

const hardcodedUser = 'caa20840-36bd-4e7e-8599-f32ed1c2d646'

interface UserForm {
  ID: string,
  full_name: string,
  personal_ID: number,
  username: string,
  email: string,
  phone_number: string,
  pwd: string,
  credits: number,
  type: string,
  subscription_ID: number,
  profile: string,
  state: string,
}

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
    subscription_ID: 0,
    profile: "",
    state: "",
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

const buildUser = (userData: any) => {
  return {
    ID: userData.ID,
    full_name: userData.user_detail?.full_name,
    personal_ID: userData.user_detail?.personal_ID,
    username: userData.user_detail?.username,
    email: userData.email,
    phone_number: userData.user_detail?.phone_number,
    pwd: userData.pwd,
    credits: userData.creator?.credits,
    type: userData.type || "", 
    subscription_ID: userData.creator?.subscription_ID,
    profile: userData.creator?.profile,
    state: userData.state,
  }
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

const MyProfile = ()  => {
  const [user, setUserData] = useState<UserForm>(initUser());
  const [audios, setAudioData] = useState<DownloableAudio[]>(initAudio());
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId, userType } = useAuth(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //const userID = (user != undefined) ? user.ID : ""
        if (userId) {
        const response = await getUserById(userId);
        //const responsePurchases = await getPurchasesAudioByBuyer(userId)

        const userData = buildUser(response.data);
        setUserData(userData);
      
        //setAudioData(getAudios(buildPurchases(responsePurchases)));
      }
      
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDelete = async () => {
    deleteUser(user.ID)

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await modifyUser({
        ID: user.ID,
        pwd: user.pwd,
        type: user.type,
        state: user.state,
        user_detail_ID: "N/A",
        personal_ID: Number(user.personal_ID),
        username: user.username,
        full_name: user.full_name,
        phone_number: user.phone_number,
        creator_ID: "N/A",
        profile: user.profile,
        points: 0,
        credits: 0,
        subscription_ID: 0,
        account_ID: "N/A",
        personal_account_ID: "N/A",
        account_type: "cbu",

      });
      console.log("Response:", response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const modifyUser = async (user: UserPayload | undefined) => {
    if (user != undefined) {
      const userPayload = user

      const response = await updateUser(userPayload)

      console.log(response)
    }
  }

  const deleteUser = async (userID: string) => {
    const response = await deleteByID(userID)

    console.log(response)
    // Solo se ejecuta una vez al montar el componente

  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Title */}
      <Header title="Mi perfil" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Credits */}
        {user?.credits !== undefined ? (
          <p>Créditos: {user.credits}</p>
          ) : (
          <p>Créditos no disponibles</p>
        )}
        <UserDetail userForm={user} />
        <select
                    value={userType || ""}
                    disabled={!isEditing}
                    className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${isEditing ? "border border-purple-500" : "border-none"}`}
                    onChange={(e) => setUserData({ ...user, type: e.target.value })}
                    >
                    <option value="buyer">Comprador</option>
                    <option value="creator">Creador</option>
                  </select>

        <DownloadList audios={audios} />

      </div>
      <Footer />
    </div>
  );
}

export default withAuth(MyProfile, ["creator", "buyer"]);