import { useEffect } from "react";
import FormInitSesion from "./FormInitSesion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthToken } from "@/services/Login/tokenService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/entities/customJwtPayload";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(getAuthToken(), "----------------------------------");
    const key = getAuthToken();
    if (key) {
      const decoded = jwtDecode<CustomJwtPayload>(key);
      if (decoded.role === "ADMIN") {
        console.log("Es admin");
        navigate("/madmin", { replace: true });
      } else {
        console.log("Es usuario");
        navigate("/muser", { replace: true });
      }
    }
  }, []);
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
