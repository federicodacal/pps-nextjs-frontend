import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Carrito de compras",
    description: "Carrito de compras",
};

export default function Cart() {
    return (
        <main className="flex flex-col items-center p-24">
          <span className="text-5xl">Carrito</span>
        </main>
      );
}