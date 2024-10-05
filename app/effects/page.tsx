import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Efectos",
    description: "Listado de FX",
};

export default function Effects() {
    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Listado de efectos</span>
        </main>
      );
}