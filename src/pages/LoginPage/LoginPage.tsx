import FormInitSesion from "./FormInitSesion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="shadow-2xl">
        {/* Agrega sombreado a la tarjeta */}
        <Card className="border-zinc-300 bg-white rounded-lg shadow-2xl p-8">
          <CardHeader className="w-80">
            <CardTitle>BIENVENIDO</CardTitle>
            <CardDescription className="font-bold">
              Inicia sesión con los datos proporcionados por sus distribuidores
              del sistema para acceder a la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormInitSesion />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
