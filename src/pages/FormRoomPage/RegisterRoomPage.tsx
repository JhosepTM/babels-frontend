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
    .min(5, { message: "El nombre esta vacio o es muy corto" })
    .max(50, { message: "El nombre es muy grande" }),

  description: z
    .string()
    .min(10, { message: "La descripcion esta vacia o es muy corta" })
    .max(200, { message: "La descripcion es muy grande" }),

  files: z
    .any()
    .refine(
      (file) => file?.length <= 7,
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
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Ingrese un precio",
    }),

  roomType: z.enum(["Basico", "Medio", "Gold"], {
    required_error: "Seleccione una opcion",
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

  const fileRef = form.register("files", { required: true });

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

      // Obtener el ID de la sala creada
      const idRoom = responseRoom.data["idRoom"];

      // Crear un objeto FormData y agregar el ID de la sala
      const formData = new FormData();
      formData.append("roomId", idRoom);

      // Agregar las imágenes al objeto FormData
      for (let i = 0; i < values.files.length; i++) {
        formData.append("files", values.files[i]);
      }

      // Realizar la solicitud POST para cargar las imágenes
      const responseImage = await axios.post(
        "http://localhost:8081/api/images/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Imágenes cargadas exitosamente:", responseImage.data);
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
                  <FormLabel>Nombre de la Habitacion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre de la habitacion"
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
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la descripcion de la habitacion"
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
            name="files"
            render={({}) => {
              return (
                <FormItem>
                  <FormLabel>Imagenes</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      {...fileRef}
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
                        <SelectValue placeholder="Seleccione la capacidad de la habitacion" />
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
                  <FormLabel>Tipo de Habitaciom</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-b border-gray-500 bg-transparent">
                        <SelectValue placeholder="Seleccione la capacidad de la habitacion" />
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

          <Button type="submit" className="w-full">
            Registrar
          </Button>
        </form>
      </Form>
    </main>
  );
}
