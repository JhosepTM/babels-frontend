import { Header } from "@/components/Header";
import RegisterRoomPage from "./RegisterRoomPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddRoomPage = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div>
          <Card className="border-none">
            <CardHeader>
              <CardTitle className="flex justify-center items-center">
                Crea Nuevas Habitaciones
              </CardTitle>
              <CardDescription className="font-bold text-center px-48">
                Descubre nuestra herramienta de creación de habitaciones,
                diseñada para simplificar el proceso de configuración de nuevos
                espacios en tu hotel. Con esta función, puedes rápidamente
                agregar habitaciones a tu inventario sin complicaciones.
                Simplemente introduce los detalles básicos como nombre,
                descripción, precio, imágenes, capacidad y tipo de habitación, y
                listo.
              </CardDescription>
            </CardHeader>
            <CardContent className=" bg-white rounded-lg -mt-24">
              <RegisterRoomPage />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
