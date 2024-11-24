"use client"

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import { User, UserData } from '../../types/users';

export default function MyProfile() {
  const [user, setUserData] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = (user != undefined) ? user.ID : ""
        const response = await getUserById(userID);

        console.log("Datos del usuario:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const modifyUser = async (user: User | undefined) => {
    if (user != undefined) {
      // Tomar info del form
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

  const deleteUser = async (user: User | undefined) => {
    if (user != undefined) {
      const response = await deleteByID(user.ID)

      console.log(response)
    }// Solo se ejecuta una vez al montar el componente

  }

  return (
    <main className="flex flex-col items-center p-24">
      <span className="text-5xl">Mi Perfil</span>
      <div>
        <ul>
          <li>{user?.username}</li>
          <li>{user?.email}</li>
          <li>{user?.type}</li>
          <li>{user?.credits}</li>
        </ul>
      </div>
      <div>
        <button onClick={() => modifyUser(user)}>Modificar</button>
        <button onClick={() => deleteUser(user)}> Baja de usuario</button>
      </div>
    </main>
  );
}