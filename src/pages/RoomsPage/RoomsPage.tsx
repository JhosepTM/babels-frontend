import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/ui/Header';

const RoomsPage = () => {
  const imagePaths = [
    '/src/assets/images/img1.jpeg',
    '/src/assets/images/img2.jpeg',
    '/src/assets/images/img3.jpeg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <Header showBackButton backRoute="/madmin" showAddRoomButton={true} />
      <div className="flex justify-center items-center mt-8">
        <div className="flex rounded-lg shadow-lg bg-zinc-800 w-full max-w-screen-md max-h-72 overflow-hidden">
          <div className="flex">
            <div className="flex-shrink-0 w-2/5 relative">
              <img
                src={imagePaths[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-transparent p-2 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={handlePrevImage}
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-transparent p-2 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={handleNextImage}
              >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>
            </div>

            <div className="p-4 flex flex-col justify-between w-full">
              <div>
                <h2 className="text-white font-bold mb-2 text-lg md:text-xl lg:text-2xl">Cuarto del Amor</h2>
                <p className="text-white mb-4 text-sm md:text-base lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec massa euismod, accumsan velit vitae, sagittis nibh. Pellentesque aliquam nisl massa, ut lobortis tortor egestas a. Donec laoreet risus a nisl efficitur, a porta ligula egestas.</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-gray-950 text-white px-2 py-1 rounded text-xs md:text-sm lg:text-base transition duration-300 ease-in-out transform hover:scale-105">Editar</button>
                <button className="bg-gray-950 text-white px-2 py-1 rounded text-xs md:text-sm lg:text-base transition duration-300 ease-in-out transform hover:scale-105">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
