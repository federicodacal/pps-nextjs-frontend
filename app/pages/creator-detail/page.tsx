"use client"

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import UserDetail from '../../components/detail/UserDetail';
import { UserPayload } from '../../types/users';

const hardcodedUser = 'user_003'

const initUser = () => {
  return {
    ID: "",
    email: "",
    pwd: "",
    type: "",
    user_detail: initUserDetail(),
    creator: initCreator(),
    created_at: '',
    modified_at: '',
    user_detail_ID: "",
    state: "",
  }
}

const initUserDetail = () => {
  return {
    ID: "",
    username: "",
    full_name: "",
    personal_ID: 0,
    phone_number: "",
    created_at: "",
    modified_at: "",

  }
}

const initCreator = () => {
  return {
    ID: "",
    created_at: "",
    credits: 0,
    modified_at: "",
    points: 0,
    profile: "",
    state: "",
    subscription_ID: "",
    user_ID: "",
    account: {
      ID: "",
      created_at: "",
      creator_ID: "",
      modified_at: "",
      personal_account_ID: "",
      type: ""
    }
  }
}

const buildCreator = (response: any) => {
  return {
    ID: response.creator.ID,
    created_at: response.creator.created_at,
    credits: response.creator.credits,
    modified_at: response.creator.modified_at,
    points: response.creator.points,
    profile: response.creator.profile,
    state: response.creator.state,
    subscription_ID: response.creator.subscription_ID,
    user_ID: response.creator.user_ID,
    account: response.creator.account
  }
}

const buildUser = (response: any) => {
  return {
    ID: response.ID,
    email: response.email,
    pwd: response.pwd,
    type: response.type,
    state: response.user_detail.state,
    user_detail: {
      ID: response.user_detail.ID,
      username: response.user_detail.username,
      full_name: response.user_detail.full_name,
      personal_ID: response.user_detail.personal_ID,
      phone_number: response.user_detail.phone_number,
      created_at: response.user_detail.created_at,
      modified_at: response.user_detail.modified_at,
    },
    creator: buildCreator(response),
    created_at: response.user_detail.created_at,
    modified_at: response.user_detail.modified_at,
    user_detail_ID: response.user_detail.user_detail_ID,
  }
}

export default function CreatorDetail() {
  const [user, setUserData] = useState(initUser());
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = (user != undefined) ? user.ID : ""
        const response = await getUserById(hardcodedUser);

        console.log("Datos del usuario:", response.data);
        setUserData(buildUser(response));
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  if (loading) {
    return <div className="text-white text-center">Cargando...</div>;
  }

  if (!user) {
    return <div className="text-red-500 text-center">No se encontró el usuario.</div>;
  }

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
        personal_ID: Number(user.user_detail.personal_ID),
        username: user.user_detail.username,
        full_name: user.user_detail.full_name,
        phone_number: user.user_detail.phone_number,
        creator_ID: "N/A",
        profile: user.creator.profile,
        points: 0,
        credits: Number(user.creator.credits),
        subscription_ID: user.creator.subscription_ID,
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

      {/* Form */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md max-w-4xl mx-auto relative">
        {/* Credits */}
        <div className="absolute mb-5 mr-5 top-1 right-1 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg text-lg">
          Créditos: {user.creator.credits}
        </div>

        <UserDetail user={user} />

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleConfirm}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg"
            >
              Modificar
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
          >
            Baja de usuario
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-lg mb-4">¿Estás seguro de eliminar tu cuenta?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
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
      <Footer />
    </div>
  );
}