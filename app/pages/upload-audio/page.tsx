"use client"

import AudioForm from "@/app/components/audio/AudioForm";
import Header from '../../components/header/Header';

export default function Page() {
  return (
    <div>
      <Header title="Carga nuevo audio"/>
      <AudioForm />  
    </div>
  );
}