import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Carousel = ({
  data,
}: {
  data: { image: string; title: string; description: string }[];
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (carouselRef.current) {
        const { width, height } = carouselRef.current.getBoundingClientRect();
        setCarouselSize({ width, height });
      }
    };
    updateSize(); 
    window.addEventListener("resize", updateSize); 
    return () => window.removeEventListener("resize", updateSize);
  }, [currentImg]);

  const handleNext = () => {
    if (currentImg < data.length - 1) {
      setCurrentImg((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImg > 0) {
      setCurrentImg((prev) => prev - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Carousel container */}
      <div className="relative h-96 w-full overflow-hidden rounded-md">
        <div
          ref={carouselRef}
          style={{
            transform:  `translateX(-${Math.min(
              currentImg, 
              data.length - 1
            ) * carouselSize.width}px)`,
            willChange: "transform",
            boxSizing: "border-box",
            zIndex: 1, 
          }}
          className="absolute flex h-full w-full transition-transform duration-500"
        >
          {data.map((item, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image
                className="pointer-events-none"
                alt={`carousel-image-${i}`}
                fill
                src={item.image}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                priority= {i === 0}
                style={{ willChange: "transform",
                  objectFit: "cover",
                 }}
                //onLoad={() => {
                //  if (carouselRef.current) {
                //    const { width, height } = carouselRef.current.getBoundingClientRect();
                //    console.log(`Width and height:  ${width} ${height}`)
                //    setCarouselSize({ width, height });
                //  }
                //}}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-bold">{data[currentImg]?.title}</h2>
        <p className="mt-2">{data[currentImg]?.description}</p>
      </div>

      {/* Navigation buttons */}
      <div className="mt-3 flex justify-center">
        <button
          disabled={currentImg === 0}
          onClick={handlePrev}
          className={`border px-4 py-2 font-bold ${
            currentImg === 0 && "opacity-50"
          }`}
        >
          {"<"}
        </button>
        <button
          disabled={currentImg === data.length - 1}
          onClick={handleNext}
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
