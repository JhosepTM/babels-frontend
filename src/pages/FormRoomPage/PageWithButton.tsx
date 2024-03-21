import { useState } from "react";
import Modal from "./Modal";

const PageWithButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Abrir modal</button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default PageWithButton;
