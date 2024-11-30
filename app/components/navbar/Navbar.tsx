"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const Navbar = () => {
  const { token, logout, userType } = useAuth(); 
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(true);

  const publicPages = [
    { path: "/pages/test", text: "TEST" },
    { path: "/pages/samples", text: "Samples" },
    { path: "/pages/effects", text: "Effects" },
    { path: "/pages/acapellas", text: "Acapellas" },
    { path: "/pages/admin", text: "Admin" },
  ];
  
  const privatePages = [
    ...(userType === "creator"
      ? [{ path: "/pages/upload-audio", text: "Carga nuevo audio" }]
      : []),
    { path: "/pages/favorites", text: "Favorites" },
    { path: "/pages/cart", text: "Cart" },
    { path: "/pages/checkout", text: "Checkout" },
  ];
  
  const userMenus = token
    ? [
        { path: "/pages/my-profile", text: "Mi perfil" },
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
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 justify-between">
      <Link className="flex items-center" href="/">
        LOGO AUDIOLIBRE
      </Link>

      <div className="flex items-center">
        {[
          ...publicPages, 
          ...(token ? privatePages : []), 
        ].map((page) => (
          <Link key={page.path} className="mr-2 m-5" href={page.path}>
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
            <Link key={menu.path} className="mr-2 m-5" href={menu.path}>
              {menu.text}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};
