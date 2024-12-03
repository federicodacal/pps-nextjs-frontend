
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { UserPayload } from '../../../types/users';
import UserCard from '@/app/components/user-form/UserCard';

const hardcodedUser = 'user_003'

const initUser = () => {
  return {
    ID: "",
    full_name: "",
    personal_ID: "",
    username: "",
    email: "",
    phone_number: "",
    pwd: "",
    credits: "",
    type: "",
    subscription_ID: "1",
    profile: "",
    state: "",
  }
}

const buildUser = (response: any) => {
  return {
    ID: response.data.ID,
    full_name: response.data.user_detail.full_name,
    personal_ID: response.data.user_detail.personal_ID,
    username: response.data.user_detail.username,
    email: response.data.email,
    phone_number: response.data.user_detail.phone_number,
    pwd: response.data.pwd,
    credits: response.data.creator.credits,
    type: response.data.type,
    subscription_ID: "1",
    profile: "Enthusiastic developer and designer.",
    state: response.data.state,
  }
}

export default async function UserDetail({ params }) {
  const fetchUser = async (ID:string) => {
    const response = await getUserById(ID);

    console.log(response.data)

    return response.data
  }

  const user = await fetchUser(params.ID as string)
  

  /*const router = useRouter();
  const { ID } = router.query; // Captura el parámetro dinámico "id"
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (ID) {
      getUserById(ID as string)
        .then(setUser)
        .catch(console.error);
    }
  }, [ID]);

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <UserCard user={user} />
    </main>
  );*/

  return (<>
    <div>
      <Header title="Detalles del usuario" />
    </div>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    </div>
    <div>
      <h1>{params.ID}</h1>
      <h1>{user.state}</h1>
    </div>

    <div className='w-screen'>
      <Footer />
    </div>

  </>)
}

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const user = await getUserById(id as string);
  console.log(user)
  return { props: { user } };
};*/