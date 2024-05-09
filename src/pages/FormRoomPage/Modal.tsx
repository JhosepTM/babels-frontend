import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterRoomPage from "./RegisterRoomPage";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-4 rounded-lg w-5/6 h-3/4 max-w-2xl max-h-full overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Card className="border-none w-full">
          <CardHeader>
            <CardTitle>Crea tus habitaciones</CardTitle>
            <CardDescription className="font-bold">
              Inicia sesión con los datos proporcionados por sus distribuidores
              del sistema para acceder a la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="-mt-20 bg-white rounded-lg">
            <RegisterRoomPage />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
