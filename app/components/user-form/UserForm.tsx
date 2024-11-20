"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/services/users-service";
import storage from "local-storage-fallback";

export default function UserForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userData, setFormData] = useState({
    ID: "999",
    email: "",
    confirmEmail: "",
    username: "",
    full_name: "",
    phone: "",
    pwd: "",
    confirmPassword: "",
    type: "Comprador",
    termsAccepted: "false",
    personal_ID: "999",
    state: "pending",
    user_detail_ID: "999",
    plan_id: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...userData, [name]: value });
  };

  const handleTermsChanges = (checked: boolean) => {
    setFormData({ ...userData, termsAccepted: checked.toString() });
  };

  const handleRoleChange = (type: string) => {
    setFormData({ ...userData, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.type === "Creador") {
      startTransition(() => {
        saveToStorage(userData);
        router.push("/pages/select-plan");
      });
    } else {
      try {
        await createUser(userData).then(() => {
          console.log("Usuario creado exitosamente");
          router.push("/pages/user-register");
        });

       

        setFormData({
          ID: "",
          email: "",
          confirmEmail: "",
          username: "",
          full_name: "",
          phone: "",
          pwd: "",
          confirmPassword: "",
          type: "Comprador",
          termsAccepted: "false",
          personal_ID: "",
          state: "",
          user_detail_ID: "",
          plan_id: "",
        });
      } catch (error) {
        console.error("Error al crear usuario:", error);
        alert("Ocurrió un error. Por favor intente nuevamente.");
      }
    }
  };

  const saveToStorage = (userData: any) => {
    Object.keys(userData).forEach((key) =>
      storage.setItem(`user_${key}`, userData[key as keyof typeof userData])
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
        {/* Email Section */}
        <div>
          <label className="block text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            required
          />
          <input
            type="email"
            name="confirmEmail"
            value={userData.confirmEmail}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            placeholder="Confirmar correo electrónico"
            required
          />
        </div>

        {/* User Details Section */}
        <div>
          <label className="block text-sm font-medium">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nombre Completo</label>
          <input
            type="text"
            name="full_name"
            value={userData.full_name}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">DNI</label>
          <input
            type="text"
            name="personal_ID"
            value={userData.personal_ID}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            required
          />
        </div>

        {/* pwd Section */}
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="pwd"
            value={userData.pwd}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            placeholder="Confirmar contraseña"
            required
          />
        </div>

        {/* User Type */}
        <div className="mb-6">
          <span className="block text-sm font-medium mb-2">Rol</span>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="comprador"
              name="role"
              value="Comprador"
              checked={userData.type === "Comprador"}
              onChange={() => handleRoleChange("Comprador")}
              className="mr-2"
            />
            <label htmlFor="comprador" className="text-sm">
              Comprador
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="creador"
              name="role"
              value="Creador"
              checked={userData.type === "Creador"}
              onChange={() => handleRoleChange("Creador")}
              className="mr-2"
            />
            <label htmlFor="creador" className="text-sm">
              Creador
            </label>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={userData.termsAccepted === "true"}
            onChange={(e) => handleTermsChanges(e.target.checked)}
            className="mr-2"
            required
          />
          <label className=" text-white">
            Acepto los términos y condiciones de uso de AudioLibre
          </label>
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-md transition-colors ${
            isPending ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
          } text-white`}
          disabled={isPending}
        >
          {isPending ? "Procesando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
