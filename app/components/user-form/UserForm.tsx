"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser, getUserByEmail, getUserByUsername } from "@/app/services/users-service";
import { User, UserDetail, UserPayload } from '../../types/users';
import storage from "local-storage-fallback";
import Notification from "@/app/components/notification/Notification";
import axios from "axios";

const initUser = () => {
  return {
    ID: "",
    email: "",
    confirmEmail: "",
    username: "",
    full_name: "",
    phone_number: "",
    pwd: "",
    confirmPassword: "",
    type: "buyer",
    termsAccepted: "false",
    personal_ID: "",
    state: "",
    user_detail_ID: "",
    plan_id: "0",
  }
}

const buildUser = (userData: any) => {
  return {
    ID: userData.ID,
    email: userData.email,
    pwd: userData.pwd,
    type: userData.type,
    state: userData.state,
    user_detail_ID: "N/A",
    personal_ID: Number(userData.personal_ID),
    username: userData.username,
    full_name: userData.full_name,
    phone_number: userData.phone_number,
    creator_ID: "N/A",
    profile: "N/A",
    points: 0,
    credits: 0,
    subscription_ID: userData.subscription_ID,
    account_ID: "N/A",
    personal_account_ID: "N/A",
    account_type: "N/A",
  }
}

export default function UserForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userData, setFormData] = useState(initUser());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...userData, [name]: value });

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  const handleTermsChanges = (checked: boolean) => {
    setFormData({ ...userData, termsAccepted: checked.toString() });

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors["termsAccepted"];
      return updatedErrors;
    });
  };

  const handleRoleChange = (type: string) => {
    setFormData({ ...userData, type });
  };

  const validate = async () => {
    const newErrors: Record<string, string> = {};

    if (!userData.email) newErrors.email = "El correo es obligatorio.";
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email))
      newErrors.email = "El correo electrónico no es válido.";
    if (!userData.confirmEmail)
      newErrors.confirmEmail = "Confirme su correo.";
    if (userData.email !== userData.confirmEmail)
      newErrors.confirmEmail = "Los correos no coinciden.";

    if (!userData.pwd) newErrors.pwd = "La contraseña es obligatoria.";
    if (!userData.confirmPassword)
      newErrors.confirmPassword = "Confirme su contraseña.";
    if (userData.pwd !== userData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (!userData.username) newErrors.username = "El nombre de usuario es obligatorio.";
    else if(userData.username.length > 15) newErrors.username = "El nombre de usuario no puede superar los 15 caracteres"
 
    if (!userData.full_name) newErrors.full_name = "El nombre completo es obligatorio.";
    if (!userData.phone_number) {
      newErrors.phone_number = "El teléfono es obligatorio.";
    } else if (!/^\(?\d{2,5}\)?[-.\d]?\d{4}[-.\d]?\d{4}$/.test(userData.phone_number)) {
      newErrors.phone_number = "El número de teléfono no es válido. Ejemplos válidos: 11-34254334, (11)34254334";
    }
    if (!userData.personal_ID) {
      newErrors.personal_ID = "El DNI es obligatorio.";
    } else if (!/^\d{7,11}$/.test(userData.personal_ID)) { 
      newErrors.personal_ID = "El DNI debe ser un número válido de entre 7 y 11 dígitos.";
    }

    if (userData.termsAccepted !== "true")
      newErrors.termsAccepted = "Debe aceptar los términos y condiciones.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    try {
      if (!newErrors.email && userData.email) {
        await getUserByEmail(userData.email);
        setNotification({ message: 'El correo electrónico ya está registrado.', type: 'error' });
        newErrors.email = "El correo electrónico ya está registrado.";
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 404) {
        newErrors.email = "Error al validar el correo electrónico.";
      }
    }

    try {
      if (!newErrors.username && userData.username) {
        await getUserByUsername(userData.username);
        setNotification({ message: 'El nombre de usuario ya está registrado.', type: 'error' });
        newErrors.username = "El nombre de usuario ya está registrado.";
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 404) {
        newErrors.username = "Error al validar el nombre de usuario.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validate();
    
    if(!isValid) return;

    if (userData.type === "creator") {
      startTransition(() => {
        saveToStorage(userData);
        router.push("/pages/select-plan");
      });
    } else {
      try {
        await createUser(buildUser(userData)).then(() => {
          console.log("Usuario creado exitosamente");
          setNotification({ message: "Usuario creado exitosamente", type: 'success' });
          router.push("/pages/user-register");
        });

        setFormData(initUser());
      } catch (error:any) {
        setNotification({ message: `Ocurrió un error: ${error?.response?.data?.message || 'Por favor intente nuevamente.'}`, type: 'error' });
        console.error("Error al crear usuario:", error);
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
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
        noValidate
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
          />
          {errors.email && <p className="text-red-500 font-bold">{errors.email}</p>}

          <input
            type="email"
            name="confirmEmail"
            value={userData.confirmEmail}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            placeholder="Confirmar correo electrónico"
          />
          {errors.confirmEmail && <p className="text-red-500 font-bold">{errors.confirmEmail}</p>}
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
          />
          {errors.username && <p className="text-red-500 font-bold">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Nombre Completo</label>
          <input
            type="text"
            name="full_name"
            value={userData.full_name}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />
          {errors.full_name && <p className="text-red-500 font-bold">{errors.full_name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">DNI</label>
          <input
            type="number"
            name="personal_ID"
            value={userData.personal_ID}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />
          {errors.personal_ID && <p className="text-red-500 font-bold">{errors.personal_ID}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            type="tel"
            name="phone_number"
            value={userData.phone_number}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
          />
          {errors.phone_number && <p className="text-red-500 font-bold">{errors.phone_number}</p>}
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
          />
          {errors.pwd && <p className="text-red-500 font-bold">{errors.pwd}</p>}
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
            placeholder="Confirmar contraseña"
          />
          {errors.confirmPassword && <p className="text-red-500 font-bold">{errors.confirmPassword}</p>}
        </div>

        {/* User Type */}
        <div className="mb-6">
          <span className="block text-sm font-medium mb-2">Rol</span>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="buyer"
              name="role"
              value="buyer"
              checked={userData.type === "buyer"}
              onChange={() => handleRoleChange("buyer")}
              className="mr-2"
            />
            <label htmlFor="buyer" className="text-sm">
              Comprador
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="creator"
              name="role"
              value="creator"
              checked={userData.type === "creator"}
              onChange={() => handleRoleChange("creator")}
              className="mr-2"
            />
            <label htmlFor="creator" className="text-sm">
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
          />
          {errors.termsAccepted && <p className="text-red-500 font-bold">{errors.termsAccepted}</p>}
          <label className=" text-white">
            Acepto los términos y condiciones de uso de AudioLibre
          </label>
        </div>

        <button
        type="submit"
        className={`w-full py-2 rounded-md transition-colors ${isPending ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"}`}
        disabled={isPending}
      >
        {isPending ? "Procesando..." : "Registrar"}
      </button>
        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}
      </form>
    </div>
  );
}
