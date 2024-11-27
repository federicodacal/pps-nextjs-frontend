"use client"

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {  UserPayload } from '../../types/users';

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
    subscription_ID: "1",
    bio: "",
    state: "",
  }
}

const buildUser = (response: any) => {
  return {
    ID: response.data.ID,
    full_name: response.data.user_detail.full_name,
    personal_ID: response.data.user_detail.personal_ID,
    username: response.data.user_detail.username,
    email: response.data.email,
    phone_number: response.data.user_detail.phone_number,
    pwd: response.data.pwd,
    credits: response.data.creator.credits,
    type: response.data.type,
    subscription_ID: "1",
    bio: "Enthusiastic developer and designer.",
    state: response.data.state,
  }
}

export default function AdminPage() {
  const [user, setUserData] = useState(initUser());
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = (user != undefined) ? user.ID : ""
        const response = await getUserById(hardcodedUser);

        console.log("Datos del usuario:", response.data);
        setUserData(buildUser(response));
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
        profile: user.bio,
        points: 0,
        credits: Number(user.credits),
        subscription_ID: Number(user.subscription_ID),
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
      <Header title="Admin"/>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md max-w-4xl mx-auto relative">
      


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