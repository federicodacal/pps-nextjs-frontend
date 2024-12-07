import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';
import { validateMailByID } from '@/app/services/users-service';

interface MailPageProps {
  params: {
    id: string;
  };
}

const MailPage: React.FC<MailPageProps> = async ({ params }) => {
  const { id } = params;

  const fetchData = async () => {
    try {
      const response = await validateMailByID(id)

      console.log(response.data)

    } catch (err) {

    }
  };

  fetchData();

  return (
    <div>
      <Header title="Correo electrónico validado" />
      <div className="flex flex-auto place-items-center mb-72 px-10 sm:px-0 m-10 text-lg" >
        <p className="text-2xl p-8 m-auto">Bienvenido a AudioLibre</p>
      </div>
      <Footer />
    </div>
  );
}


export default MailPage;