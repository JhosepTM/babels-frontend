import React, { FC, MouseEvent } from 'react';

interface ModalProps {
  onClose: () => void;
}

const ModalError : FC<ModalProps> = ({ onClose }) =>{
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <p className="text-red-500 text-lg font-semibold mb-4">Datos incorrectos</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 focus:outline-none"
        onClick={handleShowModal}
      >
        Mostrar Modal
      </button>

      {showModal && <ModalError onClose={handleCloseModal} />}
    </div>
  );
};

export default App;