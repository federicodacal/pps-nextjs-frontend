"use client"

import AudioForm from "@/app/components/audio/AudioForm";
import Header from '../../components/header/Header';
import withAuth from "@/app/hoc/withAuth";
import Footer from "@/app/components/footer/Footer";

const Page = () => {
  return (
    <div>
      <Header title="Carga nuevo audio"/>
      <AudioForm /> 
      <Footer/>
    </div>
  );
}

export default withAuth(Page, ["creator"]);