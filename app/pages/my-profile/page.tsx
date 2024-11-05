import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mi perfil",
    description: "Perfil de usuario",
};

export default function MyProfile() {
    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Mi Perfil</span>
        </main>
      );
}