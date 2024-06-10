import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expense } from "@/types/Expense";
import {
  fetchDepartments,
  fetchExpenseCategories,
  fetchPayMethods,
  fetchRooms,
  putExpense,
} from "@/utils/Fetcher";
import { useMutation, useQueries } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
  id: z.string({
    required_error: "Se requiere un ID del gasto.",
  }),
  date: z.date({
    required_error: "Se requiere una fecha para el gasto.",
  }),
  title: z.string().min(2, {
    message: "El título debe tener al menos 2 caracteres.",
  }),
  description: z
    .string()
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres.",
    })
    .max(160, {
      message: "La descripción no debe tener más de 30 caracteres.",
    }),
  category: z.string({
    required_error: "Se requiere una categoría para el gasto.",
  }),
  associatedRoom: z.string().optional(),
  amount: z.coerce
    .number({
      required_error: "Se requiere un monto para el gasto.",
    })
    .min(0, {
      message: "El monto debe ser mayor que 0.",
    }),
  payMethod: z.string({
    required_error: "Se requiere un método de pago para el gasto.",
  }),
  supplier: z.string().min(2, {
    message: "El proveedor debe tener al menos 2 caracteres.",
  }),
  supplierContact: z.string().min(6, {
    message: "El contacto del proveedor debe tener al menos 6 caracteres.",
  }),
  responsible: z.string().min(2, {
    message: "El responsable debe tener al menos 2 caracteres.",
  }),
  department: z.string({
    required_error: "Se requiere un departamento para el gasto.",
  }),
});

interface ExpenseFormProps {
  openAction?: (action: boolean) => void;
  sendSuccessAction?: () => void;
  expense?: Expense;
}

export const ExpenseForm = ({
  openAction,
  sendSuccessAction,
  expense,
}: ExpenseFormProps) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["rooms"],
        queryFn: fetchRooms,
      },
      {
        queryKey: ["payMethods"],
        queryFn: fetchPayMethods,
      },
      {
        queryKey: ["departments"],
        queryFn: fetchDepartments,
      },
      {
        queryKey: ["revenueCategories"],
        queryFn: fetchExpenseCategories,
      },
    ],
  });
  const { mutate } = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      toast.success("El Gasto ha sido registrado", {
        description: format(new Date(), "PPPPpp", { locale: es }),
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      });
      sendSuccessAction && sendSuccessAction();
    },
    onError: (error) => {
      toast.error("Error registrando Gasto", {
        description: error.message ?? "A ocurrido un error inesperado.",
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      });
    },
  });

  const roomsData = results[0].data;
  const payMethodsData = results[1].data;
  const departmentsData = results[2].data;
  const expenseCategoriesData = results[3].data;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: expense?.id ?? crypto.randomUUID(),
      title: expense?.title ?? "",
      date: expense?.date ? new Date(expense.date) : undefined,
      description: expense?.description ?? "",
      category: expense?.category,
      associatedRoom: expense?.associatedRoom ?? undefined,
      amount: expense?.amount,
      payMethod: expense?.payMethod,
      supplier: expense?.supplier ?? "",
      supplierContact: expense?.supplierContact ?? "",
      responsible: expense?.responsible ?? "",
      department: expense?.department,
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    mutate(value);
    openAction && openAction(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="flex flex-col ml-1">
                <FormLabel>Id</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123e-1234"
                    {...field}
                    disabled={expense !== undefined}
                  />
                </FormControl>
                <FormDescription>
                  Este es el ID del gasto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mr-1">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={expense !== undefined}
                        variant={"outline"}
                        className={cn(
                          "w-[255px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una Fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Esta es la fecha del gasto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mx-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Titulo del Gasto" {...field} />
              </FormControl>
              <FormDescription>
                Este es el título del gasto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mx-1">
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción del Gasto..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col ml-1">
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {expenseCategoriesData?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Esta es la categoría del gasto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="associatedRoom"
            render={({ field }) => (
              <FormItem className="flex flex-col mr-1">
                <FormLabel>Habitación Asociada</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? roomsData?.find((room) => room.id === field.value)
                              ?.name
                          : "Habitación"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar Habitación..." />
                      <CommandEmpty>No se encontro la habitación</CommandEmpty>
                      <CommandGroup>
                        {roomsData?.map((room) => (
                          <CommandItem
                            value={room.id}
                            key={room.name}
                            onSelect={() => {
                              form.setValue("associatedRoom", room.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                room.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {room.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 justify-between">
          <div className="flex items-center gap-1">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="ml-1">
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1000"
                      {...field}
                      className="text-right"
                      onKeyDown={(event) => {
                        const hasPoint = String(field.value).includes(".");
                        if (
                          /[0-9]/.test(event.key) ||
                          (event.key === "." && !hasPoint)
                        ) {
                        } else if (
                          event.key !== "Backspace" &&
                          event.key !== "Delete" &&
                          event.key !== "ArrowRight" &&
                          event.key !== "ArrowLeft"
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Este es el monto del gasto asociado. Bs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>Bs.</span>
          </div>
          <FormField
            control={form.control}
            name="payMethod"
            render={({ field }) => (
              <FormItem className="mx-1">
                <FormLabel>Método de Pago</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Método" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {payMethodsData?.map((payMethod) => (
                      <SelectItem key={payMethod.id} value={payMethod.id}>
                        {payMethod.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Este es el método de pago del gasto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem className="mx-1">
              <FormLabel>Proveedor</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del Proveedor" {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del proveedor asociado al gasto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplierContact"
          render={({ field }) => (
            <FormItem className="mx-1">
              <FormLabel>Contacto del Proveedor</FormLabel>
              <FormControl>
                <Input placeholder="Contacto del Proveedor" {...field} />
              </FormControl>
              <FormDescription>
                Este es el contacto del proveedor asociado al gasto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem className="mx-1">
              <FormLabel>Responsable</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del Responsable" {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre del responsable que registro el gasto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="mx-1">
              <FormLabel>Departmento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un Departmento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departmentsData?.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Este es el departamento asociado al gasto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
};
