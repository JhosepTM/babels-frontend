import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PersonalDataDialog } from "./PersonalDataDialog"

export const BookingRoomDialog = () => {
    return <Dialog>
        <DialogTrigger asChild>
            <Button >Reservar Habitación</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
                <DialogTitle>Formulario de Reserva</DialogTitle>
                <DialogDescription>
                    Procuere llenar los datos con cuidado y validar la veracidad de los mismos.
                </DialogDescription>
            </DialogHeader>
            {/* <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            Name
            </Label>
            <Input
            id="name"
            defaultValue="Pedro Duarte"
            className="col-span-3"
            />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
            Username
            </Label>
            <Input
            id="username"
            defaultValue="@peduarte"
            className="col-span-3"
            />
        </div>
        </div> */}
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Datos de Reserva</TabsTrigger>
                    <TabsTrigger value="password">Comparar Datos</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="h-[40vh]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos Personales</CardTitle>
                            <CardDescription>
                                Todos los campos son obligatorios.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <div className="flex flex-col w-[45%]">
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-black">Nombre Completo</Label>
                                    <Input id="name" placeholder="Pedro Duarte" />
                                </div>
                                <br />
                                <div className="space-y-1">
                                    <Label htmlFor="username" className="text-black">Nacionalidad</Label>
                                    <Input id="username" placeholder="Boliviana" />
                                </div>
                                <br />
                                <div className="space-y-1">
                                    <Label htmlFor="username" className="text-black">Dias a Reservar</Label>
                                    <Input id="username" placeholder="0" />
                                </div>
                            </div>
                            <div className="flex flex-col w-[45%] mt-0">
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-black">CI/Pasaporte</Label>
                                    <Input id="name" placeholder="12345678" />
                                </div>
                                <br />
                                <div className="space-y-1">
                                    <Label htmlFor="username" className="text-black">Cantidad de Personas</Label>
                                    <Input id="username" placeholder="0" />
                                </div>
                                <br />
                                <div className="space-y-1">
                                    <Label htmlFor="username" className="text-black">Celular (con WhatsApp)</Label>
                                    <Input id="username" placeholder="+59178584888" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password" className="h-[40vh]">
                    <Card>
                        <CardHeader className="flex justify-between">
                            <CardTitle>Compara los datos</CardTitle>
                            <p>Total a pagar: 320 Bs.</p>
                        </CardHeader>
                        <CardContent className="space-y-2 flex">
                            <div className="w-[50%] pr-[5%]">
                                <div className="space-y-1 flex justify-between">
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                </div>
                                <div className="space-y-1 flex justify-between">
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                </div>
                                <div className="space-y-1 flex justify-between">
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                </div>
                            </div>
                            <div className="w-[45%]">
                                <h3>Lista de Habitaciones a Reservar</h3>
                                <br />
                                <div className="flex flex-col overflow-y-auto h-[150px]">
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Habitacion #3
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Personas Por Habitacion
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}