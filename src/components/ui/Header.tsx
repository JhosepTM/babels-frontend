
import React, { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
  };

  return (
    <div className="flex justify-between items-center bg-gray-950 text-white py-4 border-b-2 border-030712">
      <h1 className="text-2xl font-bold mx-auto">Buenos días</h1>

      {/* Desplegable con el icono de tres líneas verticales más grande */}
      <div className="flex items-center mr-2">
        <button onClick={toggleDropdown} className="text-white font-bold">
          <IoMdMenu size={30} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-3 mt-24 bg-zinc-500 p-2 rounded shadow border border-white">
            <p className='text-white mb-2'>Juan Huzas maldonado</p>
            <hr className="my-2 border-white" />
            <button onClick={handleLogout} className="text-white rounded transition-transform transform hover:scale-105 focus:outline-none focus:shadow-outline">
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;