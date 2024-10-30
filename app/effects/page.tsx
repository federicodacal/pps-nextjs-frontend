'use client'

import type { Metadata } from "next";
import React, { useState } from 'react';
import AudioList from '../../components/audio/AudioList';
import LoginModal from '../../components/loginModal/LoginModal';


export default function Effects() {
    
const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Listado de efectos</span>
          <button onClick={() => setShowLoginModal(true)}>Iniciar Sesión</button>
      <AudioList />
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </main>
      );
}