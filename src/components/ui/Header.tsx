import React, { useState } from 'react';
import { IoMdArrowBack, IoMdMenu } from 'react-icons/io';

interface HeaderProps {
  showBackButton?: boolean;
  backRoute?: string;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, backRoute }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  const handleBackButtonClick = () => {
    if (backRoute) {
      window.location.href = backRoute;
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-950 text-white py-4 border-b-2 border-030712">
      {showBackButton && (
        <button
          onClick={handleBackButtonClick}
          className="text-gray-800 font-bold p-2 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
        >
          <span className="flex items-center">
            <IoMdArrowBack size={24} className="mr-1" />
            Regresar
          </span>
        </button>
      )}
     
      <h1 className="text-2xl font-bold mx-auto items-center">Buenos días</h1>

      <div className="flex items-center mr-2">
        <button onClick={toggleDropdown} className="text-white font-bold">
          <IoMdMenu size={30} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-3 mt-24 bg-zinc-500 p-2 rounded shadow border border-white">
            <p className="text-white mb-2">Juan Huzas maldonado</p>
            <hr className="my-2 border-white" />
            <button
              onClick={handleLogout}
              className="text-white rounded transition-transform transform hover:scale-105 focus:outline-none focus:shadow-outline"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
