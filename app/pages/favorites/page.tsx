'use client'

import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import withAuth from '@/app/hoc/withAuth';
import AudioCard from '../../components/audio/AudioCard';
import { useFavorites } from '@/app/contexts/FavoritesContext';
import Footer from '@/app/components/footer/Footer';

const Favorites = () => {
  const { favorites, loading } = useFavorites();
  const [search, setSearch] = useState("");

  const filteredFavorites = favorites.filter(
    (favorite) =>
      favorite.audio.audio_name.toLowerCase().includes(search.toLowerCase()) ||
      favorite.audio.category.toLowerCase().includes(search.toLowerCase()) ||
      favorite.audio.BPM.toString() === search
  );

  return (
    <div className="min-h-screen bg-gray-900 text-lightText p-6">
      <Header title="Listado de favoritos" />
      <input
        type="text"
        placeholder="Buscar por nombre, categoría o BPM..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-md bg-dim text-lightText placeholder-gray-400 focus:outline-none mb-6"
      />
      {loading ? (
        <p>Cargando favoritos...</p>
      ) : filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFavorites.map((favorite) => (
            <AudioCard
              key={favorite.audio.ID}
              id={favorite.audio.ID}
              name={favorite.audio.audio_name}
              creator={favorite.audio.creator_ID}
              bpm={favorite.audio.BPM.toString()}
              tone={favorite.audio.tone}
              genre={favorite.audio.genre}
              category={favorite.audio.category}
              duration={favorite.audio.length}
              audioUrl={favorite.audio.file_url}
              onAddToCart={(id) => console.log(`Agregado al carrito: ${id}`)}
              onAddToFavorites={(id) => console.log(`Agregado a favoritos: ${id}`)}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
       <Footer/>
    </div>
  );
};

export default withAuth(Favorites, ["creator", "buyer"]);