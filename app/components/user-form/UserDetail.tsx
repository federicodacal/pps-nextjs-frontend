"use client"

import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import { UserPayload, UserForm } from '../../types/users';

interface UserProps {
    userForm: UserForm
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
        account_type: "",
    }
}

const fieldsName = new Map([
    ["full_name", "Nombre completo"],
    ["username", "Nombre de usuario"],
    ["email", "Correo electrónico"],
    ["type", "Tipo de usuario"],
    ["phone_number", "Número de teléfono"],
    ["profile", "biografía"],
    ["account_type", "Tipo de cuenta"],
    ["account_id", "Número de cuenta"],
])

const UserDetail: React.FC<UserProps> = ({ userForm }) => {
    const [user, setUserData] = useState(userForm);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setUserData(userForm)
    }, [userForm]);

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

    const buildRequest = () => {
        return {
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
            credits: Number(user.credits),
            subscription_ID: Number(user.subscription_ID),
            account_ID: "N/A",
            personal_account_ID: "N/A",
            account_type: user.account_type,
        }
    };

    const handleConfirm = async () => {
        try {

            console.log(user)

            const response = await modifyUser(buildRequest());
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
        <div>
            <div className="bg-gray-800 rounded-lg p-6 shadow-md max-w-4xl mx-auto relative">


                <form className="grid grid-cols-2 gap-6">
                    {/* Form Fields */}
                    {Object.entries(user).map(([key, value]) => {
                        if (key === "personal_ID" || key === "state" || key === "user_detail" || key === "credits" || key === "ID" || key === "account_id") return null; // Hidden fields

                        const isTextArea = key === "profile";
                        const isPassword = key === "pwd";
                        const isDropdown = key === "type";
                        const isCreatorField = key === "account_type" || key === "points" || key === "subscription_ID" || key === "profile"

                        return (
                            <div
                                key={key}
                                className={`flex flex-col col-span-1 ${key === "profile" ? "col-span-2" : ""
                                    }`}
                            >
                                {isCreatorField && user.type != "creator" ? <></> :
                                    <label className="text-sm font-semibold text-gray-400 capitalize">
                                        {key === "pwd" ? "Password" : key.replace("_", " ")}
                                    </label>
                                }

                                {isTextArea && user.type == "creator" ? (
                                    <textarea
                                        value={value || ""}
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
                                        value={value}
                                        disabled={!isEditing}
                                        className={`mt-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 ${isEditing ? "border border-purple-500" : "border-none"
                                            }`}
                                        onChange={(e) =>
                                            setUserData({ ...user, [key]: e.target.value })
                                        }
                                    >
                                        <option value="Comprador">Comprador</option>
                                        <option value="Creador">Creador</option>
                                    </select>
                                ) : isCreatorField && user.type != "creator" ? (
                                    <></>
                                ) : (

                                    <input
                                        type="text"
                                        value={value || ""}
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
        </div>
    );
};

export default UserDetail