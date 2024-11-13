import AudioForm from "@/app/components/audio/AudioForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cargar audio",
    description: "Cargar un nuevo audio",
};

export default function Page() {
  return (
    <div>
      <AudioForm />  
    </div>
  );
}