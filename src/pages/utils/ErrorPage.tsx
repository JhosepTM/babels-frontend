import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function NotFound() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Card className="w-[420px] shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl">404</CardTitle>
          <CardDescription className="text-lg mt-4">
            Lo sentimos, la página que estás buscando no ha sido encontrada.
            Puede que la URL esté mal escrita o que no tenga permisos para esta pagina
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="javascript:void(0)" onClick={goBack}>
              Regresar
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
