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

interface Props {
    onDelete: () => void; // Especifica el tipo de la prop onDelete
  }

// Define the props type
export function AlertDeleteRoom({ onDelete }: Props) {

    const handleDeleteConfirmed = async () => {
        await onDelete();
      };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="flex-grow bg-gray-400 text-black hover:bg-gray-300">Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás seguro de que quieres eliminar esta habitación?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-400 hover:bg-gray-300">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirmed}>
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

