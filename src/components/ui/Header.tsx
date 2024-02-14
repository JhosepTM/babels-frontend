import React, { useState } from 'react';
import { IoMdArrowBack, IoMdMenu } from 'react-icons/io';
import { Button } from './button';
import { Badge } from './badge';

interface HeaderProps {
  showBackButton?: boolean;
  backRoute?: string;
  showAddRoomButton?: boolean; // Nueva propiedad para controlar la visibilidad del botón
}

const Header: React.FC<HeaderProps> = ({ showBackButton, backRoute, showAddRoomButton }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Agrega aquí la lógica para manejar la acción de cerrar sesión
  };

  const handleBackButtonClick = () => {
    if (backRoute) {
      window.location.href = backRoute;
    }
  };

  const handleAddRoom = () => {
    console.log('Añadiendo habitación...');
    // Redirige a la ruta "/roomsEdit"
    window.location.href = "/roomsEdit";
  };

  return (
    <div className="flex justify-between items-center bg-gray-950 text-white py-4 border-b-2 border-030712">
      <div className="flex items-center">
        {showBackButton && (
          <Button
            onClick={handleBackButtonClick}
            className="bg-white text-gray-800 font-bold p-2 rounded-lg focus:outline-none focus:shadow-outline hover:bg-gray-50 transition-transform duration-300 transform hover:scale-105"
          >
            <span className="flex items-center">
              <IoMdArrowBack size={24} className="mr-1" />
              Regresar
            </span>
          </Button>
        )}
      </div>

      <h1 className="text-2xl font-bold mx-auto items-center">Buenos días</h1>

      {showAddRoomButton && (
          <Button
            onClick={handleAddRoom}
            className="bg-white text-gray-800 font-bold p-2 rounded-lg focus:outline-none focus:shadow-outline hover:bg-gray-50 transition-transform duration-300 transform hover:scale-105"
          >
            Añadir Habitación
          </Button>
        )}

      <div className="flex items-center mr-2">
        <button
          onClick={toggleDropdown}
          className="text-white font-bold"
        >
          <IoMdMenu size={30} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-3 mt-32 bg-gray-950 py-1 ">
           <div className="flex flex-col gap-1">
            <Badge 
              className="text-white bg-gray-500 rounded focus:outline-none focus:shadow-outline">
              Juan Pablo Pinto
            </Badge>
            <Button
              onClick={handleLogout}
              className="text-white bg-gray-500 rounded transition-transform transform hover:scale-105 focus:outline-none focus:shadow-outline"
            >
              Cerrar Sesión
            </Button>
           </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;