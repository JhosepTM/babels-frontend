/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";

enum RoomCapacity {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
}

enum RoomType {
  Basico = "Basico",
  Medio = "Medio",
  Gold = "Gold",

}

interface Room {
  idRoom: number;
  nameRoom: string;
  description: string;
  capacity: RoomCapacity;
  price: number;
  roomType: RoomType;
  images: string[];
  multipartFiles: any;
}


const EditRoomPage = () => {
  const [room, setRoom] = useState<Room>();

  const idRoom = new URLSearchParams(location.search).get('idRoom');

  useEffect(() => {
    const getRooms = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const responseRoom = await axios.get(
          `http://localhost:8081/v1/rooms/${idRoom}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRoom(responseRoom.data);
      } catch (error) {
        console.error("Error al obtener la habitación:", error);
      }
    };

    if (idRoom) {
      getRooms();
    }
  }, [idRoom]);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div>
          <Card className="border-none">
            <CardHeader>
              <CardTitle className="flex justify-center items-center">
                Edita tus Habitaciones
              </CardTitle>
              <CardDescription className="font-bold text-center px-48">
              Explora nuestra herramienta de gestión de habitaciones, 
              diseñada para simplificar la tarea de editar la información de tus espacios en el hotel. 
              Con esta función, puedes modificar rápidamente los detalles de las habitaciones en 
              tu inventario de manera sencilla. Actualiza información como nombre, descripción, precio, 
              imágenes, capacidad y tipo de habitación con facilidad. ¡Haz que la gestión de tus habitaciones 
              sea más eficiente que nunca!
              </CardDescription>
            </CardHeader>
            <CardContent className=" bg-white rounded-lg -mt-24">
              {room?<EditForm room={room}/>:<p>Cargando</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditRoomPage;
