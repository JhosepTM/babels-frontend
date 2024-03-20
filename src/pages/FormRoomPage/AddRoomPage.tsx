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
              <CardTitle>Crea tus habitaciones</CardTitle>
              <CardDescription className="font-bold">
                Inicia sesión con los datos proporcionados por sus
                distribuidores del sistema para acceder a la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className=" bg-white rounded-lg -mt-20">
              <RegisterRoomPage />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
