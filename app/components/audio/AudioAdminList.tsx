'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Audio } from "@/app/types/audio";

import Link from "next/link";

type UserListProps = {
  audios: Audio[];
  title: string;
};

const AudioAdminList: React.FC<UserListProps> = ({ audios, title }) => {
  const router = useRouter();

  const handleNavigation = (id: string) => {
    router.push(`/pages/audio-detail/${id}`); // Navega a la página dinámica con el ID
  };

  return (
    <div className="bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-violet-400">{title}</h2>
      <div className="h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-purpleLight scrollbar-track-backgroundDark max-h-96 border border-gray-700 rounded-lg">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-800 text-violet-300 ">
            <tr>
              <th className="px-4 py-2">Audio name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody >
            {audios.map((audio) => (
              <tr
                key={audio.ID}
                className="cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-2">{audio.audio_name}</td>
                <td className="px-4 py-2">{audio.state}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${audio.state === "active"
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                      }`}
                  >
                    {audio.state}  
                  </span>
                </td>
                <td>
                <button
                  className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-700"
                  onClick={() => handleNavigation(audio.ID)}
                >
                  View Details
                </button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AudioAdminList;
