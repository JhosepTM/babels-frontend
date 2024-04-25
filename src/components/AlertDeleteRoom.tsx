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
// Import Axios for HTTP requests (or use fetch API)

// Define the props type
export function AlertDeleteRoom() {
    // Function to handle the delete action

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
                    <AlertDialogAction>
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}