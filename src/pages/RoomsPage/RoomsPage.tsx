/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertDeleteRoom } from "@/components/AlertDeleteRoom";

const RoomsPage = () => {
  interface Room {
    idRoom: number;
    nameRoom: string;
    description: string;
    capacity: number;
    price: number;
    roomType: string;
    images: string[];
  }
  const [rooms, setRooms] = useState<Room[]>([]);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8081/v1/rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleDeleteRoom = async (roomId: number) => {
    try {
      const response = await fetch(`http://localhost:8081/v1/rooms/${roomId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setRooms(rooms.filter(room => room.idRoom !== roomId));
      } else {
        console.error('Error al eliminar la habitación');
      }
    } catch (error) {
      console.error('Error al eliminar la habitación:', error);
    }
  };


  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center items-center mt-8 flex-wrap">
        {rooms.map((room) => (
          <div
            key={room.idRoom}
            className="flex rounded-lg shadow-lg bg-zinc-900 w-full max-w-screen-md max-h-72 overflow-hidden border-2 border-slate-950 mr-4 mb-4"
          >
            <div className="p-4 flex flex-col justify-between w-2/3">
              <div>
                <div>
                  <Label className="text-white font-bold mb-2 text-lg md:text-xl lg:text-2xl">
                    {room.nameRoom}
                  </Label>
                </div>
                <Label className="text-white mb-2 text-xs md:text-sm lg:text-base">
                  {room.description}
                </Label>
                {/* Subtítulos */}
                <div className="mb-1">
                  <Label className="text-white font-bold">
                    Cantidad de personas:
                  </Label>{" "}
                  <Label className="text-white">{room.capacity}</Label>
                </div>
                <div className="mb-1">
                  <Label className="text-white font-bold">Precio:</Label>{" "}
                  <Label className="text-white">{room.price} Bs</Label>
                </div>
                <div className="mb-1">
                  <Label className="text-white font-bold">
                    Tipo de habitación:
                  </Label>{" "}
                  <Label className="text-white">{room.roomType}</Label>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-grow hover:bg-slate-800">Editar</Button>
                <AlertDeleteRoom onDelete={() => handleDeleteRoom(room.idRoom)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;