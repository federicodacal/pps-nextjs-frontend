'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getFavoritesByUserId, addFavorite, deleteByAudioId } from "@/app/services/favorites-service";
import { useAuth } from "./AuthContext";
import { getAudioById } from "../services/audio-service";

interface Favorite {
    audio: {
        ID: string;
        audio_name: string;
        creator_ID: string;
        BPM: number;
        tone: string;
        genre: string;
        category: string;
        length: string;
        file_url: string;
    };
}

interface FavoritesContextType {
  favorites: Favorite[];
  toggleFavorite: (audio_ID: string) => void;
  isFavorite: (audio_ID: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const { userId } = useAuth();

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            if (userId) {
                const response = await getFavoritesByUserId(userId);
                setFavorites(response.data || []);
            }
        } catch (error) {
            console.error("Error al obtener favoritos:", error);
        } finally {
            setLoading(false);
        }
    };
  
    /*
    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true); 
            try {
              if (userId) {
                const response = await getFavoritesByUserId(userId);
                setFavorites(response.data || []);
              }
            } catch (error) {
              console.error("Error al obtener favoritos:", error);
            } finally {
              setLoading(false); 
            }
          };
        
          if (userId) {
            fetchFavorites();
          } else {
            setFavorites([]);
            setLoading(false);
          }
    }, [userId]); */

    useEffect(() => {
        if (userId) {
            fetchFavorites();
        } else {
            setFavorites([]);
            setLoading(false);
        }
    }, [userId]);

    const handleClick = (message: string) => {
      setAlertMessage(message);
      setTimeout(() => {
        setAlertMessage(null);
      }, 1000);
    };
  
    const toggleFavorite = async (audio_ID: string) => {
      const isFav = favorites.some((fav) => fav.audio.ID === audio_ID);
  
      try {
        if(userId){
            if (isFav) {
              await deleteByAudioId(audio_ID, userId);
              setFavorites(favorites.filter((fav) => fav.audio.ID !== audio_ID));
              console.log('Audio quitado de favoritos');
            } else {
              await addFavorite(audio_ID, userId);
              fetchFavorites();
              console.log('Audio agregado a favoritos');
            }
        }
        else {
            console.log('No hay userId: FavoriteContext');
            handleClick('Es necesario estar logeado');
        }  
      } catch (error) {
        console.error('Error al actualizar favoritos:', error);
      }
    };
  
    const isFavorite = (audio_ID: string) => favorites.some((fav) => fav.audio.ID === audio_ID);
  
    return (
      <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
        {children}
      </FavoritesContext.Provider>
    );
};
  
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
      throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
    }
    return context;
};

function setAlertMessage(message: string) {
  throw new Error("Function not implemented.");
}
