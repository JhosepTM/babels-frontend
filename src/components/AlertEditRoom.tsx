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

export function AlertEditRoom() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="flex-grow bg-gray-900  hover:bg-gray-700">Guardar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás seguro de que quiere guardar los cambios?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción guardara los cambios hechos en la habitacion.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-400 hover:bg-gray-300">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction>
                        Guardar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}