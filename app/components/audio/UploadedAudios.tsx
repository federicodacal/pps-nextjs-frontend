import { deleteAudioByIdServer } from "@/app/services/audio-service";
import React from "react";
import AudioDetailCard from "./AudioDetailCard";
import { AudioItem } from "@/app/types/audio";
import AudioPlayer from "./AudioPlayer";

type AudioFile = {
  BPM: number
  ID: string
  audio_name: string
  category: string
  created_at: string
  creator_ID: string
  description: string
  file_name: string
  file_url: string
  genre: string
  item: AudioItem
  length: number
  modified_at: string
  score: number
  size: number
  state: string
  tone: number
};

type DownloadListProps = {
  audios: AudioFile[];
};

const UploadedAudios: React.FC<DownloadListProps> = ({ audios }) => {

  const handleDownload = (fileUrl: string | undefined) => {
    /*if (!fileUrl) {
      alert("Invalid file URL");
      return;
    }*/
    const link = document.createElement("a");
    const testLink = fileUrl

    window.open(testLink, "_blank");
    /*link.href = "fileUrl";
    link.download = testLink.split("/").pop() || "audio.wav";
    link.click();*/
  };

  const handleDelete = async (audioID: string) => {
    const response = await deleteAudioByIdServer(audioID)

    console.log(response)
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 ">Mis audios subidos</h2>
      <ul>
        {audios.length > 0 ?
          audios.map((audio) => (
            <li
              key={audio.ID}
              className="mb-4 p-4 border border-gray-700 rounded-lg hover:bg-gray-700"
            >
              <div className="flex gap-4 ">
                <p>
                  <strong>Name:</strong> {audio.audio_name || "Unknown"}
                </p>
                <p>
                  <strong>Genre:</strong> {audio.genre || "Unknown"}
                </p>
                <p>
                  <strong>BPM:</strong> {audio.BPM || "Unknown"}
                </p>
                <p>
                  <strong>Category:</strong> {audio.category || "Unknown"}
                </p>
                <p>
                  <strong>Size:</strong> {audio.size} MB
                </p>
              </div>
              <div>
              <AudioPlayer
                        audioUrl={audio.file_url}
                        onAddToCart={() => {}}
                        onAddToFavorites={() => {}}
                        full={false}
                    />
              </div>
              <button
                onClick={() => handleDelete(audio.ID)}
                className="mt-2 px-4 py-2 bg-rose-400 text-black rounded hover:bg-blue-500"
              >
                Eliminar
              </button>
            </li>
          )) :
          <></>
        }
        { }
      </ul>
    </div>
  );
};

export default UploadedAudios;