import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Favoritos",
    description: "Listado de audios favoritos",
};

export default function Favorites() {
    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Listado de audios favoritos</span>
        </main>
      );
}