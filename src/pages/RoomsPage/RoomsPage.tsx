import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RoomsPage = () => {
  const imagePaths = [
    "/src/assets/images/img1.jpeg",
    "/src/assets/images/img2.jpeg",
    "/src/assets/images/img3.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center items-center mt-8">
        <div className="flex rounded-lg shadow-lg bg-zinc-900 w-full max-w-screen-md max-h-72 overflow-hidden border-2 border-slate-950">
          <div className="flex">
            <div className="flex-shrink-0 w-2/5 relative">
              <img
                src={imagePaths[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-transparent p-2 rounded-full focus:outline-none"
                onClick={handlePrevImage}
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-transparent p-2 rounded-full focus:outline-none"
                onClick={handleNextImage}
              >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>
            </div>

            <div className="p-4 flex flex-col justify-between w-full">
              <div>
                <h2 className="text-white font-bold mb-2 text-lg md:text-xl lg:text-2xl">
                  Cuarto del Amor
                </h2>
                <Label className="text-white mb-4 text-sm md:text-base lg:text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  nec massa euismod, accumsan velit vitae, sagittis nibh.
                  Pellentesque aliquam nisl massa, ut lobortis tortor egestas a.
                  Donec laoreet risus a nisl efficitur, a porta ligula egestas.
                </Label>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-grow hover:bg-slate-800">Editar</Button>
                <Button className="flex-grow bg-gray-400 text-black hover:bg-gray-300">
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
