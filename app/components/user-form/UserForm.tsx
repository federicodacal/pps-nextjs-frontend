"use client"

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  confirmEmail: string;
  username: string;
  fullName: string;
  dni: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userType: 'Creador' | 'Comprador';
  termsAccepted: boolean;
};

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    confirmEmail: '',
    username: '',
    fullName: '',
    dni: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'Comprador',
    termsAccepted: false,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e: {target: { checked: boolean; value: React.SetStateAction<string> };}) => {
    const {  value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData, checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.userType === 'Creador') {
      startTransition(() => {
        router.push('/select-plan');
      });
    } else {
      startTransition(async () => {
        await fetch('/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        router.push('/thank-you');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Section */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
          required
        />
        <input
          type="email"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleChange}
          className="w-full p-2 mt-2 border text-gray-700 border-gray-300 rounded-md"
          placeholder="Confirmar correo electrónico"
          required
        />
      </div>

      {/* User Details Section */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Nombre de Usuario</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Nombre Completo</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">DNI</label>
        <input
          type="text"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Password Section */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 mt-2 border text-gray-700 border-gray-300 rounded-md"
          placeholder="Confirmar contraseña"
          required
        />
      </div>

      {/* User Type */}
      

      {/* Terms Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="mr-2"
          required
        />
        <label className="text-gray-700">Acepto los términos y condiciones de uso de AudioLibre</label>
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-md transition-colors ${
          isPending ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'
        } text-white`}
        disabled={isPending}
      >
        {isPending ? 'Procesando...' : 'Registrar'}
      </button>
    </form>
  );
}