'use client'; 

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/auth-service";

interface AuthContextType {
  token: string | null;
  setAuthToken: (token: string) => void;
  logout: () => void;
  userType: string | null;
  userId: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token guardado correctamente en el estado: ", token);
      localStorage.setItem("token", token); 
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.sub) {
          setUserType(decoded.sub.type);
          setUserId(decoded.sub.ID);
        }
        else {
          throw new Error("Token invalido");
        }
      } catch {
        setUserType(null);
        setUserId(null);
      } 
    }
    else {
      setUserType(null);
      setUserId(null);
    }
    setLoading(false);
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

  const logout = async () => {
    try {
      const response = await logoutUser(token)
      router.push("/");
      console.log(response); 
    } catch (error:any) {
      console.error("Error en logout:", error.response?.data?.message || "Error");
    }
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, logout, userType, userId, loading }}>
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
