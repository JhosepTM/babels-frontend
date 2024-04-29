import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EditRoomPage = () => {
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditRoomPage;
