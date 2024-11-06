import UploadAudio from "@/app/components/audio-form/UploadAudio";
import { createAudio } from "@/app/services/audio-service";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
    title: "Cargar audio",
    description: "Cargar un nuevo audio",
};

export default function Page() {
  return (
    <div>
      <UploadAudio />  
    </div>
  );
}