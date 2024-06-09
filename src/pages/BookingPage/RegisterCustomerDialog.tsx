import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { createCustomer } from "@/modules/booking/services/customer-service"
import { CustomerModel } from "@/modules/booking/models/customer"

const formSchema = z.object({
    id: z.string(),
    firstName: z.string().min(2, {
        message: "El nombre no puede tener menos de dos caractres"
    }).max(50),
    lastName: z.string().min(2, {
        message: "El apellido no puede tener menos de dos caractres"
    }).max(50),
    ci: z.string(),
    passport: z.string(),
    phone: z.string({
        required_error: "El número de contacto es obligatorio"
    }).min(7, {
        message: "El número de contacto debe contener minimo de 7 caracteres"
    }).max(50),
    email: z.string().email({
        message: "El correo no es valido"
    }),
    birthdate: z.date({
        required_error: "La fecha de nacimiento es obligatoria",
        invalid_type_error: "No se introdujo una fecha"
    })
})

export interface RegisterCustomerDialogProps {
    handleCustomer: (customer: CustomerModel) => void
}

export const RegisterCustomerDialog = ({handleCustomer}: RegisterCustomerDialogProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            firstName: "",
            lastName: "",
            ci: "",
            passport: "",
            phone: "",
            email: "",
            birthdate: undefined
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        const response = await createCustomer(values)
        if(response){
            handleCustomer(response)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >Registrar Cliente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] bg-gray-50">
                <DialogHeader>
                    <DialogTitle>Registrar nuevo cliente</DialogTitle>
                    <DialogDescription>
                        Procuere llenar los datos con cuidado y validar la veracidad de los mismos.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card>
                            <CardContent className="flex justify-between pt-5 items-start">

                                <div className="flex flex-col w-[45%]">

                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre completo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Pedro Duarte" autoComplete="off" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apellidos</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Sosa Galbarro" autoComplete="off" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    <FormField
                                        control={form.control}
                                        name="ci"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CI</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="12345689" autoComplete="off" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    <FormField
                                        control={form.control}
                                        name="passport"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pasaporte</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123455678" autoComplete="off" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col w-[45%] mt-0">
                                    <FormField
                                        control={form.control}
                                        name="birthdate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fecha de inicio</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[280px] justify-start text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {field.value ? format(field.value, "PPP") : <span>Fecha de inicio</span>}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>{
                                                                const dateAux = new Date();
                                                                dateAux.setDate(dateAux.getDate() - 1);
                                                                return date < new Date("1900-01-01")}
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Celular (con WhatsApp)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="59178584888" autoComplete="off" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="correo@gmail.com" autoComplete="off" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </CardContent>
                        </Card>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button type="submit">Guardar</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant={"outline"}>Cancelar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}