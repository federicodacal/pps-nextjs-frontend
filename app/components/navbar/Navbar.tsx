"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pages = [
  { path: "/pages/test", text: "TEST" },
  { path: "/pages/upload-audio", text: "Carga nuevo audio" },
  { path: "/pages/samples", text: "Samples" },
  { path: "/pages/effects", text: "Effects" },
  { path: "/pages/acapellas", text: "Acapellas" },
  { path: "/pages/favorites", text: "Favorites" },
  { path: "/pages/cart", text: "Cart" },
];

const userMenus = [
  { path: "/pages/my-profile", text: "Mi perfil" },
  { path: "/pages/login", text: "Login" },
  { path: "/pages/register", text: "Sign Up" },
];

export const Navbar = () => {

  const { token, logout } = useAuth(); 
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(true);

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
      <span></span>
      <Link className="flex items-center" href="/">
        LOGO AUDIOLIBRE
      </Link>

      <div className="flex items-center ">
        {pages.map((page) => (
          <Link key={page.path} className="mr-2 m-5" href={page.path}>
            {page.text}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        {token ? (
          
          <>
            <Link key="/pages/my-profile" className="mr-2 m-5" href="/pages/my-profile">
              Mi perfil
            </Link>
            <button onClick={handleLogout} className="mr-2 m-5 text-white">
              Logout
            </button>
          </>
        ) : (
          
          <>
            <Link key="/pages/login" className="mr-2 m-5" href="/pages/login">
              Login
            </Link>
            <Link key="/pages/register" className="mr-2 m-5" href="/pages/register">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
