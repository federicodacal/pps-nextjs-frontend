"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/services/auth-service";
import { useAuth } from "@/app/contexts/AuthContext";

const initUser = () => ({
  email: "",
  pwd: "",
});

export default function LoginForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [userData, setFormData] = useState(initUser());
    const { setAuthToken } = useAuth();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...userData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if(!userData.email || !userData.pwd) {
        alert("Campos incompletos");
        return;
      }
  
      try {
        const response = await loginUser(userData);
        console.log(response);
        if (response.status_code == 200 && response.token) {
          setAuthToken(response.token)
          router.push("/");
        } else {
          throw new Error(response.message);
        }
      } catch (err: any) {
        console.log("Error: " + err.message);
      } 
    };
  
    return  (
        <div>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-16 rounded shadow-md w-full mt-1"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        
                {/* Email Section */}
                <div className="w-full mb-4">
                <label className="block text-sm font-medium mb-2">
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
                </div>

                {/* Password Section */}
                <div className="w-full mb-4">
                <label className="block text-sm font-medium mb-2">Contraseña</label>
                <input
                    type="password"
                    name="pwd"
                    value={userData.pwd}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded p-2"
                    required
                />
                </div>

                <button
                type="submit"
                className={`w-full py-3 rounded-md transition-colors ${isPending ? "bg-gray-500" : "bg-green-500 hover:bg-green-600 mt-4"} text-white`}
                disabled={isPending}
                >
                {isPending ? "Procesando..." : "Iniciar sesión"}
                </button>
            </form>
        </div>
      );
    }
  