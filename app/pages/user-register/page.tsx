import AudioForm from "@/app/components/audio/AudioForm";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import type { Metadata } from "next";

export default function Page() {
  return (
    <div>
      <Header title="¡Gracias por registrarse!" />
      <div  className="flex flex-auto place-items-center mb-72 px-10 sm:px-0 m-10 text-lg" >
        <p className="text-2xl m-20">Revise su correo electrónico para activar su usuario y comenzar a disfrutar de la plataforma</p>
      </div>
      <Footer/>
    </div>

  );
}