"use client"

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import { User, UserData } from '../../types/users';

const hardcodedUser = 'user_003'

export default function MyProfile() {
  const [user, setUserData] = useState({
    ID: "",
    full_name: "",
    personal_ID: "",
    username: "",
    email: "",
    phone_number: "",
    credits: 0,
    pwd: "",
    type: "",
    subscription_ID: "",
    bio: "",
    state: "active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = (user != undefined) ? user.ID : ""
        const response = await getUserById(hardcodedUser);

        console.log("Datos del usuario:", response.data);
        setUserData({
          ID: response.data.ID,
          full_name: response.data.user_detail.full_name,
          personal_ID: response.data.user_detail.personal_ID,
          username: response.data.user_detail.username,
          email: response.data.email,
          phone_number: response.data.user_detail.phone_number,
          pwd: response.data.pwd,
          credits: response.data.credits,
          type: response.data.type,
          subscription_ID: response.data.subscription_ID,
          bio: "Enthusiastic developer and designer.",
          state: response.data.state,
        });
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

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
      const response = await modifyUser(user);
      console.log("Response:", response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const modifyUser = async (user: UserData | undefined) => {
    if (user != undefined) {
      const userPayload: UserData = {
        ID: user.ID,
        username: user.username,
        full_name: user.full_name,
        pwd: user.pwd,
        personal_ID: user.personal_ID,
        type: user.type,
        state: user.state,
        subscription_ID: user.subscription_ID,
      }

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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col">
    {/* Title */}
    <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

    {/* Form */}
    <div className="bg-gray-800 rounded-lg p-6 shadow-md max-w-4xl mx-auto relative">
      {/* Credits */}
      <div className="absolute mb-5 mr-5 top-1 right-1 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg text-lg">
        Créditos: {user.credits}
      </div>

      <form className="grid grid-cols-2 gap-6">
        {/* Form Fields */}
        {Object.entries(user).map(([key, value]) => {
          if (key === "personal_ID" || key === "state") return null; // Hidden fields

          const isTextArea = key === "bio";
          const isPassword = key === "pwd";
          const isDropdown = key === "type";

          return (
            <div
              key={key}
              className={`flex flex-col col-span-1 ${
                key === "bio" ? "col-span-2" : ""
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
                  className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${
                    isEditing ? "border border-purple-500" : "border-none"
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
                  className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${
                    isEditing ? "border border-purple-500" : "border-none"
                  }`}
                  onChange={(e) =>
                    setUserData({ ...user, [key]: e.target.value })
                  }
                />
              ) : isDropdown ? (
                <select
                  value={value}
                  disabled={!isEditing}
                  className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${
                    isEditing ? "border border-purple-500" : "border-none"
                  }`}
                  onChange={(e) =>
                    setUserData({ ...user, [key]: e.target.value })
                  }
                >
                  <option value="Comprador">Comprador</option>
                  <option value="Creador">Creador</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={value}
                  readOnly={!isEditing}
                  className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${
                    isEditing ? "border border-purple-500" : "border-none"
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
  </div>
  );
}