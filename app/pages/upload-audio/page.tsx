import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cargar audio",
    description: "Cargar un nuevo audio",
};

export default function UploadAudio() {
    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Cargar nuevo audio</span>
        </main>
      );
}