import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Samples",
    description: "Listado de audios samples",
};

export default function Samples() {
    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Listado de samples</span>
        </main>
      );
}