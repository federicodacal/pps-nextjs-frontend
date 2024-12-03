import UserForm from '../../components/user-form/UserForm';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center">
    <Header title='AudioLibre'/>
    <div className="w-full max-w-lg  rounded-lg shadow-lg ">
      <UserForm />
    </div>
    <Footer/>
  </main>
  );
}