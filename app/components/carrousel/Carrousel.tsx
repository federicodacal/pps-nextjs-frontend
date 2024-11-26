"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Image = {
  url: string;
  text: string;
};



const Carousel = ({data,}: {data: {image: string;}[];
}) => {
  // State and Ref initialization
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef(null);

  // useEffect to get the initial carousel size
  useEffect(() => {
    let elem = carouselRef.current as unknown as HTMLDivElement;
    let { width, height } = elem.getBoundingClientRect();
    if (carouselRef.current) {
      setCarouselSize({
        width,
        height,
      });
    }
  }, []);

  return (
    <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Carousel container */}
      
      <div className="relative h-96 w-full  overflow-hidden rounded-md">
        {/* Image container */}
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="absolute flex h-full w-full transition-all duration-300"
        >
          {/* Map through data to render images */}
          {data.map((v, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image
                className="pointer-events-none"
                alt={`carousel-image-${i}`}
                fill
                src={v.image || "https://random.imagecdn.app/500/500"}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum maxime, doloribus maiores debitis atque quae porro amet reprehenderit, dicta quibusdam officia? Repellendus aliquid minima consequuntur animi quibusdam voluptates, totam a.</p>
      </div>

      {/* Navigation buttons */}
      <div className="mt-3 flex justify-center">
        <button
          disabled={currentImg === 0}
          onClick={() => setCurrentImg((prev) => prev - 1)}
          className={`border px-4 py-2 font-bold ${
            currentImg === 0 && "opacity-50"
          }`}
        >
          {"<"}
        </button>
        <button
          disabled={currentImg === data.length - 1}
          onClick={() => setCurrentImg((prev) => prev + 1)}
          className={`border px-4 py-2 font-bold ${
            currentImg === data.length - 1 && "opacity-50"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
