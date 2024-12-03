import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import LoginForm from "@/app/components/login-form/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Ingreso de usuario",
};


export default function Login() {
    return (
        <div className="flex flex-col">
            <Header title="Login" />

                <div className="m-auto items-center max-w-2xl p-8 rounded-lg shadow-lg ">
                    <LoginForm />
                </div>

            <Footer />
        </div>
    );
}