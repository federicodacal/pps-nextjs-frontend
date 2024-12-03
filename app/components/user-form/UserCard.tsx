"use client"

import { useState } from 'react';
import { User } from '../../types/users';

import { refuseByID, approveByID } from '@/app/services/users-service';

const UserCard = ({ user }: { user: User }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleClick = (message: string) => {
        setAlertMessage(message);
        setTimeout(() => {
          setAlertMessage(null);
        }, 2000); // La alerta desaparece después de 1 segundo
      };

    const refuseData = async () => {
        try {
            const response = await refuseByID(user.ID);

            console.log("Rechazo:", response.data);
            handleClick("Se ha rechazado al usuario")
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    const approveData = async () => {
        try {
            const response = await approveByID(user.ID);

            console.log("Aprobación:", response.data);
            handleClick("Se ha aprobado al usuario")
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg space-y-4 m-10">
            <h1 className="text-2xl font-bold">{user.user_detail.username}</h1>
            <p><strong>Nombre completo:</strong> {user.user_detail.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.user_detail.phone_number}</p>
            <p><strong>ID:</strong> {user.user_detail.personal_ID}</p>
            <p><strong>profile:</strong> {user.creator.profile}</p>
            <p><strong>ID:</strong> {user.user_detail.personal_ID}</p>
            <p><strong>Fecha de alta:</strong> {user.created_at}</p>
            <p><strong>Estado:</strong> {user.state}</p>
            <div className='h-full flex items-center justify-center gap-5 mt-10'>
                <button
                    className="px-4 py-2 bg-rose-400 text-white rounded hover:bg-rose-600"
                    onClick={() => refuseData()}
                >
                    Rechazar usuario
                </button>
                <button
                    className="px-4 py-2 bg-emerald-400 text-white rounded hover:bg-emerald-600"
                    onClick={() => approveData()}
                >
                    Aprobar usuario
                </button>
            </div>
            <div>
          {alertMessage && (
            <div
              className="fixed bottom-0 left-0 right-0 mx-auto mb-4 w-11/12 max-w-xl bg-yellow-500 text-black text-lg font-semibold px-6 py-4 rounded-lg shadow-lg animate-fade-in-out"
              style={{ zIndex: 50 }}
            >
              {alertMessage}
            </div>
          )}
        </div>

        </div>

    );
};

export default UserCard;