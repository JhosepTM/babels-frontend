import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MenubarTrigger } from "@radix-ui/react-menubar";
import { logoutUser } from "@/services/Login/Logout"; // Importa la función para cerrar sesión
import { Link } from "react-router-dom";

export function AlertDialogSesion() {
  const handleLogout = () => {
    logoutUser(); // Llama a la función para cerrar sesión
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MenubarTrigger>Salir</MenubarTrigger>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de que quieres salir?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción cerrará tu sesión actual.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-blue-700 text-white hover:bg-blue-500">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 text-white hover:bg-red-500"
            onClick={handleLogout} // Llama a la función handleLogout al hacer clic
          >
            <Link to={"/"}>Salir</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
