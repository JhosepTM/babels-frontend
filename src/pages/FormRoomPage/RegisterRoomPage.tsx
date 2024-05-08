/* eslint-disable no-empty-pattern */
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
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    nameRoom: z
      .string()
      .min(5, { message: "El nombre está vacío o es muy corto" })
      .max(50, { message: "El nombre es muy grande" }),
  
    description: z
      .string()
      .min(10, { message: "La descripción está vacía o es muy corta" })
      .max(200, { message: "La descripción es muy grande" }),
  
    multipartFiles: z
      .any()
      .refine(
        (file) => file?.length <= 7,
        "Por favor, asegúrese de cargar no más de 7 imágenes."
      ),
  
    capacity: z.enum(["1", "2", "3", "4", "5", "6"], {
      required_error: "Seleccione una opción",
    }),
  
    price: z
      .string({ required_error: "Ingrese un valor" })
      .refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Ingrese un precio válido",
      }),
  
    roomType: z.enum(["Basico", "Medio", "Gold"], {
      required_error: "Seleccione una opción",
    }),
  });
  
  export default function Home() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        nameRoom: "",
        description: "",
      },
    });
  
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const token = localStorage.getItem("auth_token");
        const responseRoom = await axios.post(
          "http://localhost:8081/v1/rooms",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const idRoom = responseRoom.data["idRoom"];

        
  
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

  
        const responseImage = await axios.post(
          "http://localhost:8081/v1/imagen-room",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Imágenes cargadas exitosamente:", responseImage.data);
        
        // Redirigir a la página "/madmin/rooms" si las imágenes se cargaron exitosamente
        window.location.href = "/madmin/rooms";
        
      } catch (error) {
        console.error("Error al crear la sala o cargar imágenes:", error);
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="description"
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
              render={({}) => {
                return (
                  <FormItem>
                    <FormLabel>Imágenes</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        {...form.register("multipartFiles", { required: true })}
                        className="border-b border-gray-500 bg-transparent"
                      />
                    </FormControl>
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
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border-b border-gray-500 bg-transparent">
                          <SelectValue placeholder="Seleccione la capacidad de la habitación" />
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
                    <FormLabel>Precio de la habitación</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ingrese el precio de la habitación"
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
                    <FormLabel>Tipo de Habitación</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border-b border-gray-500 bg-transparent">
                          <SelectValue placeholder="Seleccione la capacidad de la habitación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="hover:bg-gray-500 hover:text-black">
                        <SelectItem value="Basico">Básico</SelectItem>
                        <SelectItem value="Medio">Medio</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full">
              Registrar
            </Button>
          </form>
        </Form>
      </main>
    );
  }