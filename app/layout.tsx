import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../app/components/navbar/Navbar";
import { AuthProvider } from "../app/contexts/AuthContext";

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
          <Navbar/>
          <main className="flex flex-col items-center p-24">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
