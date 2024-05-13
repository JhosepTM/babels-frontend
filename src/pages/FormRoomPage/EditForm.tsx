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

const formSchema = z.object({
  nameRoom: z
    .string()
    .min(5, { message: "El nombre está vacío o es muy corto" })
    .max(50, { message: "El nombre es muy grande" }),
  multipartFiles: z
    .array(z.string())
    .refine(
      (files) => files.length <= 6,
      "Por favor, asegúrese de cargar no más de 6 imágenes."
    )
    .refine(
      (files) =>
        files.every((file) => file.length <= 5000000),
      `Asegúrese de cargar al menos una imagen con un tamaño máximo de 5MB.`
    ),
});

interface Room {
  idRoom: number;
  nameRoom: string;
  images: string[];
}

export interface EditFormPageProps {
  room: Room;
}

export default function EditForm({ room }: EditFormPageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameRoom: room.nameRoom,
    },
  });

  // Utiliza selectedFiles para mantener el estado de las imágenes seleccionadas
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchRoomImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/v1/imagen-room/${room.idRoom}/imagenes`
        );
        form.setValue("multipartFiles", response.data); // Actualiza los archivos en el formulario
      } catch (error) {
        console.error("Error al obtener las imágenes de la habitación:", error);
      }
    };

    fetchRoomImages();
  }, [room.idRoom, form]);

  const idRoom = new URLSearchParams(location.search).get("idRoom");

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
    } catch (error) {
      console.error("Error al crear la sala o cargar imágenes:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Elimina la imagen del estado selectedFiles y del formulario
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    form.setValue("multipartFiles", updatedFiles.map(file => file.name));
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
                      <label htmlFor="picture" className="cursor-pointer border-b border-gray-500 bg-transparent py-1 px-3">
                        Elegir Archivos
                      </label>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          const files = event.target.files;
                          if (files) {
                            const newFiles = Array.from(files);
                            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);

                            // Actualizar el contador de archivos
                            const remainingFiles = newFiles.length + selectedFiles.length;
                            const fileText = remainingFiles === 1 ? "Archivo" : "Archivos";
                            document.getElementById("file-count")!.innerText = `${remainingFiles} ${fileText}`;
                          }
                        }}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                    </div>
                  </FormControl>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
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
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex">
            <AlertEditRoom />
          </div>
        </form>
      </Form>
    </main>
  );
}