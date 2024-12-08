"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { token, logout, userType, username } = useAuth(); 
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(true);

  const publicPages = [
    { path: "/pages/samples", text: "Samples" },
    { path: "/pages/effects", text: "Efectos" },
    { path: "/pages/acapellas", text: "Acapellas" },
    { path: "/pages/admin", text: "Admin" },
  ];
  
  const privatePages = [
    { path: "/pages/favorites", text: "Favoritos" },
    { path: "/pages/cart", text: "Carrito" },
    ...(userType === "creator"
      ? [{ path: "/pages/upload-audio", text: "Carga nuevo audio" }]
      : []),
  ];
  
  const userMenus = token
    ? [
        { path: "/pages/my-profile", text: username },
        { text: "Logout", onClick: () => logout() },
      ]
    : [
        { path: "/pages/login", text: "Login" },
        { path: "/pages/register", text: "Sign Up" },
      ];

  useEffect(() => {
    setIsLoading(false); 
  }, [token]);

  const handleLogout = () => {
    logout();
    router.push("/"); 
  };

  if (isLoading) {
    return null; 
  }

  return (
    <nav className="flex bg-gradient-to-b to-[#3B0764] from-[#291b38] bg-opacity-30 justify-between ">
      <Link className="flex items-center ml-8 mt-5" href="/" >
      <Image
            src="/home.png" // Ruta de la imagen
            alt="Example Link"
            width={60} // Ancho de la imagen
            height={60} // Altura de la imagen
            className="rounded-lg shadow-lg group-hover:scale-105 group-hover:opacity-80 transition-transform duration-300 ease-in-out "
            priority
          />
      </Link>

      <div className="flex items-center ">
        {[
          ...publicPages, 
          ...(token ? privatePages : []), 
        ].map((page) => (
          <Link key={page.path} className="mr-2 m-5 p-3 rounded border-1 border-indigo-500 outline hover:outline-2" href={page.path}>
            {page.text}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        {userMenus.map((menu) =>
          menu.onClick ? (
            <button
              key={menu.text}
              onClick={menu.onClick}
              className="mr-2 m-5 text-white"
            >
              {menu.text}
            </button>
          ) : (
            <Link key={menu.path} className="mr-2 m-5 p-3 rounded border-1 border-emerald-500 outline hover:outline-2" href={menu.path}>
              {menu.text}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};
