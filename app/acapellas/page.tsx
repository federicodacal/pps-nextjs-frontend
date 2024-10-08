import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Acapellas",
    description: "Listado de audios acapellas",
};

export default function Acapellas() {
    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Listado de audios acapellas</span>
        </main>
      );
}