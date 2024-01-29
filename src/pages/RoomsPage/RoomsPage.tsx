import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/ui/Header';

const RoomsPage = () => {
  // Lista de rutas de imágenes
  const imagePaths = [
    '/src/assets/images/img1.jpeg',
    '/src/assets/images/img2.jpeg',
    '/src/assets/images/img3.jpeg',
    // Agrega más rutas de imágenes según sea necesario
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
        <div className="flex rounded-lg shadow-lg bg-zinc-800 w-2/4 max-h-72 overflow-hidden">
          {/* Contenedor de la imagen y texto */}
          <div className="flex">
            {/* Contenedor de la imagen (lado izquierdo) */}
            <div className="flex-shrink-0 w-2/5 relative">
              <img
                src={imagePaths[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              {/* Flecha izquierda */}
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-transparent p-4 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={handlePrevImage}
              >
                <FontAwesomeIcon icon={faChevronLeft} size="2x" />
              </button>
              {/* Flecha derecha */}
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-transparent p-4 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={handleNextImage}
              >
                <FontAwesomeIcon icon={faChevronRight} size="2x" />
              </button>
            </div>

            {/* Contenedor del texto y botones (lado derecho) */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-white font-bold mb-4">Cuarto del Amor</h2>
                <p className="text-white mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec massa euismod, accumsan velit vitae, sagittis nibh. Pellentesque aliquam nisl massa, ut lobortis tortor egestas a. Donec laoreet risus a nisl efficitur, a porta ligula egestas.</p>
              </div>
              <div className="flex space-x-4">
                {/* Botón Eliminar */}
                <button className="bg-gray-950 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105">Editar</button>
                {/* Botón Editar */}
                <button className="bg-gray-950 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;