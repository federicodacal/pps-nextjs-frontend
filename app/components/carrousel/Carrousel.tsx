'use client'

import { useState } from 'react';
import Image from 'next/image';

type Image = {
  url: string;
  text: string;
};

const images: Image[] = [
  { url: '/image1.jpg', text: 'Imagen 1' },
  { url: '/image2.jpg', text: 'Imagen 2' },
  { url: '/image3.jpg', text: 'Imagen 3' },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex items-center">
      <button onClick={handlePrev} className="text-white p-2">❮</button>
      <div className="flex flex-col items-center w-full mx-4">
        <Image width={500} height={500} src={images[currentIndex].url} alt="carousel image" className="h-64 w-full object-cover rounded-md" />
        <p className="text-white mt-2">{images[currentIndex].text}</p>
      </div>
      <button onClick={handleNext} className="text-white p-2">❯</button>
    </div>
  );
}