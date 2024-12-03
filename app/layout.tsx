import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../app/components/navbar/Navbar";
import { AuthProvider } from "../app/contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AudioLibre",
  description: "Encuentra el sonido que buscas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
          <Navbar/>
          <main className="flex flex-col items-center bg-gray-900">{children}</main>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
