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
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function AlertEditRoom({ onSubmit }: { onSubmit: () => Promise<void> }) {
  const navigate = useNavigate();

  const handleSaveAndRedirect = async () => {
    try {
      // Ejecutar la función onSubmit, que debería enviar los cambios al backend
      await onSubmit();

      // Después de que onSubmit se complete con éxito, redirigir al usuario
      navigate("/madmin/rooms");
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      // Manejar errores si ocurren durante el proceso de guardar
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex-grow bg-gray-900 hover:bg-gray-700">Guardar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de que quieres guardar los cambios?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción guardará los cambios hechos en la habitación.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-400 hover:bg-gray-300">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSaveAndRedirect}>
            Guardar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}