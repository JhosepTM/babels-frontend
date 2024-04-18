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
import axios from 'axios';

// Define the props type
interface AlertDeleteRoomProps {
    idRoom: number; // Assuming roomId is a number
}
export function AlertDeleteRoom({ idRoom }: AlertDeleteRoomProps) {
    // Function to handle the delete action
    const handleDelete = async () => {
        try {
            // Perform the DELETE request
            const response = await axios.delete(`/v1/rooms/${idRoom}`);
            if (response.status === 204) {
                // Handle successful deletion, e.g., notify user, refresh list, redirect, etc.
                alert('Habitación eliminada con éxito');
                // Optionally, redirect or re-fetch data
            }
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Error al eliminar la habitación:', error);
            alert('Error al eliminar la habitación');
        }
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
                    <AlertDialogAction onClick={handleDelete}>
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}