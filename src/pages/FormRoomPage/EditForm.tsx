/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { AlertEditRoom } from "@/components/AlertEditRoom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  nameRoom: z
    .string()
    .min(1, { message: "El nombre esta vacio" })
    .max(50, { message: "El nombre es muy grande" })
    .refine(val => val.length >= 1 && val.length <= 50, "File is required"),

  description: z
    .string()
    .min(10, { message: "La descripcion esta vacia o es muy corta" })
    .max(200, { message: "La descripcion es muy grande" }),

  multipartFiles: z
    .any()
    .refine(
      (file) => file?.length <= 6,
      "Por favor, asegúrese de cargar no más de 10 imágenes."
    )
    .refine(
      (file) => file[0]?.size <= 5000000,
      `Asegúrese de cargar al menos una imagen con un tamaño máximo de 5MB.`
    ),

  capacity: z.enum(["1", "2", "3", "4", "5", "6"], {
    required_error: "Seleccione una opcion",
  }),

  price: z
    .string({ required_error: "Ingrese un valor" })
    .refine((val) => !Number.isNaN(parseInt(val, 7)), {
      message: "Ingrese un precio",
    }),

  roomType: z.enum(["Basico", "Medio", "Gold"], {
    required_error: "Seleccione una opcion",
  }),
});

enum RoomCapacity {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
}

enum RoomType {
  Basico = "Basico",
  Medio = "Medio",
  Gold = "Gold",

}

interface Room {
  idRoom: number;
  nameRoom: string;
  description: string;
  capacity: RoomCapacity;
  price: number;
  roomType: RoomType;
  multipartFiles: any;
  images: string[];
}

interface SelectedFile {
  url: string;
  id: number;
  isRemoved?: boolean;
}

export interface EditFormPageProps {
  room: Room;
}

export default function EditForm({ room }: EditFormPageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameRoom: room.nameRoom,
      description: room.description,
      capacity: room.capacity as RoomCapacity,
      price: `${room.price}`,
      roomType: room.roomType as RoomType,
    },
  });

  // Utiliza selectedFiles para mantener el estado de las imágenes seleccionadas
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  const [numberOfImages, setNumberOfImages] = useState(0);

  useEffect(() => {
    const fetchRoomImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/v1/imagen-room/${room.idRoom}/imagenes`
        );

        console.log(response.data);
        setNumberOfImages(response.data.length);

        const files = response.data.map((image: { image_Url: any; id: any; }) => ({
          file: null,
          url: image.image_Url,
          id: image.id
        }));
        setSelectedFiles(files);
        form.setValue("multipartFiles", files.map((file: { name: any; }) => file.name));
      } catch (error) {
        console.error("Error al obtener las imágenes de la habitación:", error);
      }
    };

    fetchRoomImages();
  }, [room.idRoom, form]);

  const idRoom = new URLSearchParams(location.search).get("idRoom") ?? "";


  const handleRemoveImage = async (index: number) => {
    try {
      const updatedFiles = selectedFiles.map((file, i) => {
        if (i === index) {
          // Marcar la imagen como eliminada
          return { ...file, isRemoved: true };
        }
        return file;
      });
      setSelectedFiles(updatedFiles);

      // Actualiza el valor de multipartFiles en el formulario
      form.setValue("multipartFiles", updatedFiles.filter(file => !file.isRemoved).map(file => file.url));
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };


  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const isNameEmpty = values.nameRoom.trim() === "";
      const isDescriptionEmpty = values.description.trim() === "";
  
      // Si ambos campos están vacíos, no realices la solicitud PUT y sal de la función
      if (isNameEmpty || isDescriptionEmpty) {
        console.log("Los campos de nombre y descripción están vacíos.");
        return;
      }

      const Images = numberOfImages;

      const hasImages = values.multipartFiles && values.multipartFiles.length > 0;
  
      const removedImages = selectedFiles.filter(file => file.isRemoved);
  
      // Obtener el número total de imágenes después de agregar y eliminar
      const addImages = values.multipartFiles.length;
      const aux = Images - removedImages.length;
  
      console.log("Imágenes de la habitación:", Images);
      console.log("Imágenes añadidas a la habitación:", addImages);
      console.log("Imágenes eliminadas de la habitación:", removedImages);
      console.log("Auxiliar:", aux);
  
      let totalImagenesRoomGuardar;
  
      if (aux === addImages) {
        totalImagenesRoomGuardar = addImages;
      } else {
        totalImagenesRoomGuardar = Images + addImages - removedImages.length;
      }
  
      console.log("Total imágenes para guardar:", totalImagenesRoomGuardar);
  
      // Validar que haya al menos una imagen y no más de 6 imágenes
      if (!hasImages || totalImagenesRoomGuardar === 0 || totalImagenesRoomGuardar > 6) {
        console.log("Una habitación debe tener al menos 1 imagen y no más de 6 imágenes.");
        return;
      }

      // Realizar la solicitud PUT para actualizar la habitación
      const token = localStorage.getItem("auth_token");
      await axios.put(
        `http://localhost:8081/v1/rooms/${idRoom}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Promise.all(selectedFiles
        .filter(file => file.isRemoved) // Filtra solo las imágenes marcadas como eliminadas
        .map(async (file) => {
          await axios.delete(`http://localhost:8081/v1/imagen-room/imagen/${file.id}`);
        }));

      // Actualizar selectedFiles eliminando las imágenes marcadas como eliminadas
      setSelectedFiles(selectedFiles.filter(file => !file.isRemoved));

      //seee
      const formData = new FormData();
      formData.append("idRoom", idRoom);

      const files: File[] = [];

      // Iterar sobre el FileList y agregar cada archivo al array files
      for (let i = 0; i < values.multipartFiles.length; i++) {
          const file = values.multipartFiles[i];
          files.push(file);
      }
      
      // Agregar cada archivo al FormData
      for (let i = 0; i < files.length; i++) {
          formData.append("multipartFiles", files[i]);
      }

      if (values.multipartFiles && values.multipartFiles.length > 0) {
      await axios.post(
        "http://localhost:8081/v1/imagen-room",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
     }
      //seee

      // Eliminar las imágenes seleccionadas de la base de datos

    } catch (error) {
      console.error("Error al editar la habitacion", error)
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="nameRoom"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre de la Habitación</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre de la habitación"
                      className="border-b border-gray-500 bg-transparent"
                      type="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            rules={{ required: 'La descripción es obligatoria' }}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la descripción de la habitación"
                      className="border-b border-gray-500 bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="multipartFiles"
            render={({ }) => {
              return (
                <FormItem>
                  <FormLabel>Imágenes</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        {...form.register("multipartFiles", { required: true })}
                        className="border-b border-gray-500 bg-transparent"
                      />
                    </div>
                  </FormControl>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFiles.map((file, index) => (
                      !file.isRemoved && ( // Asegúrate de no renderizar la imagen si está marcada como eliminada
                        <div key={index} className="relative">
                          <img
                            src={file.url}
                            alt={`Imagen ${index}`}
                            className="w-20 h-20 object-cover"
                          />
                          <button
                            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full text-sm"
                            onClick={() => handleRemoveImage(index)}
                          >
                            X
                          </button>
                        </div>
                      )
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cantidad de personas</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-b border-gray-500 bg-transparent">
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="hover:bg-gray-500 hover:text-black">
                      <SelectItem value="1">1 persona</SelectItem>
                      <SelectItem value="2">2 personas</SelectItem>
                      <SelectItem value="3">3 personas</SelectItem>
                      <SelectItem value="4">4 personas</SelectItem>
                      <SelectItem value="5">5 personas</SelectItem>
                      <SelectItem value="6">6 personas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Precio de la habitacion</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ingrese el precio de la habitacion"
                      className="border-b border-gray-500 bg-transparent"
                      onKeyDown={(event) => {
                        // Evita que se ingresen caracteres no numéricos
                        if (
                          !(
                            event.key === "Backspace" || event.key === "Delete"
                          ) &&
                          !/\d/.test(event.key)
                        ) {
                          event.preventDefault();
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tipo de Habitacion</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-b border-gray-500 bg-transparent">
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="hover:bg-gray-500 hover:text-black">
                      <SelectItem value="Basico">Basico</SelectItem>
                      <SelectItem value="Medio">Medio</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex">
            <AlertEditRoom onSubmit={() => handleSubmit(form.getValues())} />
          </div>
        </form>
      </Form>
    </main>
  );
}