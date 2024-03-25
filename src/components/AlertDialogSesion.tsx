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

export function AlertDialogSesion() {
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
          <AlertDialogCancel className="bg-gray-400 hover:bg-gray-300">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className=""
            onClick={() => {
              window.location.href = "/login";
              window.localStorage.removeItem("auth_token");
            }}
          >
            Salir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
