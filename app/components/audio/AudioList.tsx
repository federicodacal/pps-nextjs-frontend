import React, { useState } from "react";
import AudioItem from "./AudioItem";
import SearchBar from "../searchbar/SearchBar";

interface Audio {
  id: number;
  name: string;
  creator: string;
  tone: string;
  bpm: number;
  duration: string;
  favorite: boolean;
}

export default function AudioList() {
  const [audios, setAudios] = useState<Audio[]>([
    {
      id: 1,
      name: "Audio 1",
      creator: "Creador 1",
      tone: "C",
      bpm: 120,
      duration: "3:30",
      favorite: false,
    },
    // Otros audios pueden añadirse aquí
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleFavorite = (id: number) => {
    setAudios((prevAudios) =>
      prevAudios.map((audio) =>
        audio.id === id ? { ...audio, favorite: !audio.favorite } : audio
      )
    );
  };

  const filteredAudios = audios.filter((audio) =>
    audio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar/>
      <ul>
        {filteredAudios.map((audio) => (
          <AudioItem
            key={audio.id}
            audio={audio}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
}
