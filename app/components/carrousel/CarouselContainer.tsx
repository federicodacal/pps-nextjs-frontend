"use client";

import React, { useEffect, useState } from "react";
import { getCarrousel } from "@/app/services/carrousel-service"; 
import Carousel from "./Carrousel";

const CarouselContainer = () => {
  const [carouselData, setCarouselData] = useState<
    { image: string; title: string; description: string }[]
  >([]);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await getCarrousel();
        const transformedData = response.data.map((item: any) => ({
          image: item.imgUrl,
          title: item.titulo,
          description: item.descripcion,
        }));
        console.log('Carrousel:');
        console.log(response.data);
        setCarouselData(transformedData);
      } catch (error) {
        console.error("Error al traer carousel data:", error);
      }
    };

    fetchCarouselData();
  }, []);

  return (
    <div>
      {carouselData.length > 0 ? (
        <Carousel data={carouselData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CarouselContainer;
