import Header from "@/app/components/header/Header";
import LoginForm from "@/app/components/login-form/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Ingreso de usuario",
};


export default function Login() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#4b3561] to-[#E5CCFF] flex flex-col items-center p-4">
            <Header title="AudioLibre" />
            <div className="w-full max-w-none p-8 rounded-lg shadow-lg mt-1">
                <h1 className="text-3xl font-bold text-center mb-0">Login</h1>
                <LoginForm />
            </div>
        </main>
    );
}