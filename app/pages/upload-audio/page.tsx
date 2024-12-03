"use client"

import AudioForm from "@/app/components/audio/AudioForm";
import Header from '../../components/header/Header';
import withAuth from "@/app/hoc/withAuth";

const Page = () => {
  return (
    <div>
      <Header title="Carga nuevo audio"/>
      <AudioForm />  
    </div>
  );
}

export default withAuth(Page, ["creator"]);