
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import UserCard from '@/app/components/user-form/UserCard';
import { getAudioById } from '@/app/services/audio-service';
import AudioDetailCard from '@/app/components/audio/AudioDetailCard';

interface Props {
  params: any
}

const UserDetail: React.FC<Props> = async ({ params }) => {
  const fetchAudio = async (ID: string) => {
    const response = await getAudioById(ID);

    console.log(response.data)

    return response.data
  }

  const audio = await fetchAudio(params.ID as string)

  return (<>
    <div>
      <Header title="Detalles de audio" />
    </div>
    <div className="h-full bg-gray-900 flex items-center justify-center">
      <AudioDetailCard audio={audio} />
    </div>
    <div className='w-screen'>
      <Footer />
    </div>

  </>)
}

export default UserDetail
