import * as z from "zod";
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

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  roomName: z
    .string()
    .min(5, { message: "El nombre esta vacio o es muy corto" })
    .max(50, { message: "El nombre es muy grande" }),

  roomDescription: z
    .string()
    .min(20, { message: "La descripcion esta vacia o es muy corta" })
    .max(200, { message: "La descripcion es muy grande" }),

  roomImages: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),

  roomCapacity: z.enum(["1", "2", "3", "4", "5", "6"], {
    required_error: "El campo es requerido",
  }),

  roomPrice: z.coerce
    .number({ required_error: "" })
    .min(1, { message: "El precio esta vacio o es muy pequeño" })
    .max(100000, { message: "El precio es muy elevado" })
    .positive({ message: "El precio debe ser mayor a 0" }),

  roomType: z.enum(["Basico", "Medio", "Gold"]),

  emailAddress: z.string().email(),
});
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      roomDescription: "",
      roomImages: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
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
            name="roomName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre de la Habitacion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre de la habitacion"
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
            name="roomDescription"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la descripcion de la habitacion"
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
            name="roomImages"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Imagenes</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" multiple {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="roomCapacity"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cantidad de personas</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la capacidad de la habitacion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
            name="roomPrice"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Precio de la habitacion</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese el precio de la habitacion"
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
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la capacidad de la habitacion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
