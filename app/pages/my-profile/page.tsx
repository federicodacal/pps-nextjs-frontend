"use client"

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {  UserPayload } from '../../types/users';
import withAuth from '@/app/hoc/withAuth';
import { useAuth } from '@/app/contexts/AuthContext';

const hardcodedUser = 'user_003'

const initUser = () => {
  return {
    ID: "",
    full_name: "",
    personal_ID: "",
    username: "",
    email: "",
    phone_number: "",
    pwd: "",
    credits: "",
    type: "",
    subscription_ID: "",
    bio: "",
    state: "",
  }
}

const buildUser = (response: any) => {
  return {
    ID: response.ID,
    full_name: response.user_detail.full_name,
    personal_ID: response.user_detail.personal_ID,
    username: response.user_detail.username,
    email: response.email,
    phone_number: response.user_detail.phone_number,
    pwd: response.pwd,
    credits: response.creator.credits,
    type: response.type,
    subscription_ID: response.creator.subscription_ID,
    bio: response.creator.profile,
    state: response.state,
  }
}

const MyProfile = () => {
  const [user, setUserData] = useState(initUser());
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useAuth(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          //const userID = (user != undefined) ? user.ID : ""
          const response = await getUserById(userId);
          console.log("Datos del usuario:", response.data);
          const userData = response.data;
          
          const user = {
            ID: userData.ID,
            email: userData.email,
            type: userData.type,
            state: userData.state,
            created_at: userData.created_at,
            modified_at: userData.modified_at,
            pwd: userData.pwd,
            creator: userData.creator ?? { }, 
            credits: userData.creator ? userData.creator.credits : 0, 
            subscription_ID: userData.creator ? userData.creator.subscription_ID : 0, 
            bio: userData.creator ? userData.creator.profile : '',
            user_detail: {
                ...userData.user_detail,
                username: userData.user_detail?.username ?? '', 
            },
          };
          //console.log("El user:");
          //console.log(user);

          setUserData(buildUser(user));
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
        profile: "",
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
      <Header title="Mi perfil"/>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md max-w-4xl mx-auto relative">
        {/* Credits */}
        {user?.credits !== undefined ? (
          <p>Créditos: {user.credits}</p>
          ) : (
          <p>Créditos no disponibles</p>
        )}

        <form className="grid grid-cols-2 gap-6">
          {/* Form Fields */}
          {Object.entries(user).map(([key, value]) => {
            if (key === "personal_ID" || key === "state" || key === "user_detail" || key === "credits" || key === "ID") return null; // Hidden fields

            const isTextArea = key === "bio";
            const isPassword = key === "pwd";
            const isDropdown = key === "type";

            return (
              <div
                key={key}
                className={`flex flex-col col-span-1 ${key === "bio" ? "col-span-2" : ""
                  }`}
              >
                <label className="text-sm font-semibold text-gray-400 capitalize">
                  {key === "pwd" ? "Password" : key.replace("_", " ")}
                </label>
                {isTextArea ? (
                  <textarea
                    value={value}
                    maxLength={100}
                    readOnly={!isEditing}
                    className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${isEditing ? "border border-purple-500" : "border-none"
                      }`}
                    rows={4}
                    onChange={(e) =>
                      setUserData({ ...user, [key]: e.target.value })
                    }
                  />
                ) : isPassword ? (
                  <input
                    type="password"
                    value={value}
                    readOnly={!isEditing}
                    className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${isEditing ? "border border-purple-500" : "border-none"
                      }`}
                    onChange={(e) =>
                      setUserData({ ...user, [key]: e.target.value })
                    }
                  />
                ) : isDropdown ? (
                  <select
                    value={user.type}
                    disabled={!isEditing}
                    className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${isEditing ? "border border-purple-500" : "border-none"}`}
                    onChange={(e) => setUserData({ ...user, type: e.target.value })}
                    >
                    <option value="buyer">Comprador</option>
                    <option value="creator">Creador</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={value}
                    readOnly={!isEditing}
                    className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${isEditing ? "border border-purple-500" : "border-none"
                      }`}
                    onChange={(e) =>
                      setUserData({ ...user, [key]: e.target.value })
                    }
                  />
                )}
              </div>
            );
          })}
        </form>

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

export default withAuth(MyProfile, ["creator", "buyer"]);