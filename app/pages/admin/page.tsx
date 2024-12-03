"use client"

import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteByID } from '@/app/services/users-service';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { User, UserPayload } from '../../types/users';
import UserList from '@/app/components/user-form/UserList';

const hardcodedUser = 'user_003'

const initUser = () => {
  return [{
    ID: "",
    email: "",
    pwd: "",
    type: "",
    state: "",
    user_detail: {
      ID: "",
      username: "",
      full_name: "",
      personal_ID: 0,
      phone_number: "",
      created_at: "",
      modified_at: "",
    },
    creator: initCreator(),
    created_at: '',
    modified_at: '',
    user_detail_ID: "",
  }]
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
    subscription_ID: 0,
    user_ID: "",
  }
}

const buildUsers = (response: any) => {
  const usersDB = response.data
  let users: User[] = []

  console.log(response.data)

  usersDB.map((user: User) => {
    users.push({
      ID: user.ID,
      email: user.email,
      pwd: user.pwd,
      type: user.type,
      state: user.state,
      user_detail: {
        ID: user.user_detail.ID,
        username: user.user_detail.username,
        full_name: user.user_detail.full_name,
        personal_ID: user.user_detail.personal_ID,
        phone_number: user.user_detail.phone_number,
        created_at: user.user_detail.created_at,
        modified_at: user.user_detail.modified_at,
      },
      creator: user.creator != null ? {
        ID: user.creator.ID,
        user_ID: user.creator.user_ID,
        credits: user.creator.credits,
        created_at: '',
        modified_at: '',
        subscription_ID: user.creator.subscription_ID,
        points: user.creator.points,
        profile: user.creator.profile,
        state: user.creator.state,
      } : initCreator(),
      created_at: user.created_at,
      modified_at: '',
      user_detail_ID: user.user_detail.ID,
    })
  });


  return users
}

export default function AdminPage() {
  const [users, setUserData] = useState(initUser());
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUsers();

        console.log("Usuarios:", response.data);
        setUserData(buildUsers(response));
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEditing(false);
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
      <Header title="Admin" />
      {/* Listados */}
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0" >
        <div className="flex flex-col w-[1000px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/*Usuarios pendientes*/}
            <div className="flex flex-col mt-5">
             
              <UserList users={users} title="Nuevos usuarios" />


               
            </div>
            <div>
              {/*Audios pendientes*/}
              <div className="flex flex-col mt-5">
              <UserList users={users} title="Audios pendientes" />
              </div>
            </div>
            {/*Usuarios suscripcion vencida*/}
            <div className="flex flex-col mt-5">
            <UserList users={users} title="Creadores por vencer" />
            </div>
          </div>
        </div>
      </div>

    {/* Modal */ }
  {
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-lg mb-4">¿Estás seguro de eliminar tu cuenta?</p>
          <div className="flex justify-center space-x-4">
            <button
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
    )
  }
  <Footer />
    </div >
  );
}