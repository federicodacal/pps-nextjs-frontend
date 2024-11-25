'use client'; 

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
const jwt_decode = require('jwt-decode');

interface AuthContextType {
  token: string | null;
  setAuthToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    console.log("Token en ls: " + savedToken);
    if (savedToken) {
      const isExpired = isTokenExpired(savedToken);
      if (!isExpired) {
        setToken(savedToken);
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token guardado correctamente en el estado: ", token);
      localStorage.setItem("token", token); 
    }
  }, [token]); 
  
  const isTokenExpired = (token: string) => {
    try {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const expiration = decoded.exp;
      const currentTime = Date.now() / 1000;
      return expiration < currentTime; 
    } catch (error) {
      return true; 
    }
  };

  const setAuthToken = (newToken: string) => {
    console.log('Token guardado:', newToken);
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
