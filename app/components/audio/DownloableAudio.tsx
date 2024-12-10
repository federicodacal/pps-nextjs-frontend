import React from "react";
import AudioPlayer from "./AudioPlayer";

type AudioFile = {
  ID: string;
  audio_name: string | undefined;
  file_url: string | undefined;
  genre: string | undefined;
  BPM: number | undefined;
  category: string | undefined;
  size: number | undefined;
};

type DownloadListProps = {
  audios: AudioFile[];
};

const DownloadList: React.FC<DownloadListProps> = ({ audios }) => {
  const handleDownload = (fileUrl: string | undefined) => {
    /*if (!fileUrl) {
      alert("Invalid file URL");
      return;
    }*/
    const link = document.createElement("a");
    const testLink = "https://pps-flask-api.vercel.app/audios/file/6753778781ef710718720e59"

    window.open(testLink, "_blank");
    /*link.href = "fileUrl";
    link.download = testLink.split("/").pop() || "audio.wav";
    link.click();*/
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 ">Mis audios comprados</h2>
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
                {audio.file_url ? <AudioPlayer
                  audioUrl={audio.file_url}
                  onAddToCart={() => { }}
                  onAddToFavorites={() => { }}
                  full={false}
                /> : <></>}

              </div>
              <button
                onClick={() => handleDownload(audio.file_url)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Descargar
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

export default DownloadList;