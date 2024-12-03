
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteByID } from '@/app/services/users-service';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { UserPayload } from '../../../types/users';
import UserCard from '@/app/components/user-form/UserCard';

interface Props {
  params: any
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

const UserDetail: React.FC<Props> = async ({ params }) => {
  const fetchUser = async (ID: string) => {
    const response = await getUserById(ID);

    console.log(response.data)

    return response.data
  }

  const user = await fetchUser(params.ID as string)

  return (<>
    <div>
      <Header title="Detalles del usuario" />
    </div>
    <div className="h-full bg-gray-900 flex items-center justify-center">
      <UserCard user={user} />
    </div>


    <div className='w-screen'>
      <Footer />
    </div>

  </>)
}

export default UserDetail
