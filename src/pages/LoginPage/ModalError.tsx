import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface ModalProps {
  onClose: () => void;
}

const ModalError: FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-zinc-600 opacity-95 p-28 rounded shadow-md text-center">
        <p className="text-white text-xl font-semibold mb-6">Campos vacios</p>
        <Button onClick={onClose} className='bg-zinc-800'> OK </Button>
      </div>
    </div>
  );
};

const App = () => {
  const [showModal, setShowModal] = React.useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {showModal && <ModalError onClose={handleCloseModal} />}
    </div>
  );
};

export default App;