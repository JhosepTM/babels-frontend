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
    <div className="flex justify-center items-center h-screen">
      <Card className="border-zinc-800">
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
  );
};

export default LoginPage;
