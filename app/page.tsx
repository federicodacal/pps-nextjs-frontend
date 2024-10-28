import Carousel from '../components/carrousel/Carrousel';
import CardGrid from '../components/cards/CardGrid';
import Footer from '../components/footer/Footer';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-gradientStart to-gradientEnd min-h-screen flex flex-col items-center">
    <header className="py-6 text-center text-white">
      <h1 className="text-3xl font-bold">Galería de Audios</h1>
    </header>

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

