import React, { useEffect } from 'react';

import Carousel from './components/carrousel/Carrousel';
import CardGrid from './components/cards/CardGrid';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-gradientStart to-gradientEnd min-h-screen flex flex-col items-center">
    <Header title="AudioLibre" />

    <section className="w-full max-w-5xl px-4 mt-8">
      <Carousel />
    </section>

    <section className="w-full max-w-5xl px-4 mt-8">
      <CardGrid />
    </section>

    <Footer />
  </main>
  );
}

