import UserForm from '../../components/user-form/UserForm';
import Header from '../../components/header/Header';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#4b3561] to-[#E5CCFF] flex flex-col items-center">
    <Header title='AudioLibre'/>
    <div className="w-full max-w-lg p-8  rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold  text-center mb-6">Registro de Usuario</h1>
      <UserForm />
    </div>
  </main>
  );
}