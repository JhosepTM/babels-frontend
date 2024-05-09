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
import { PersonalDataDialog } from "./PersonalDataDialog"
import { useState } from "react"
import { RoomCountItem } from "./RoomCountItem"
import { Checkbox } from "@/components/ui/checkbox"

export interface BookingRoomDialogProps {
    disabled?: boolean
}
export const BookingRoomDialog = ({disabled = false}: BookingRoomDialogProps) => {
    const [tabValue, setTabValue] = useState(1)
    return <Dialog>
        <DialogTrigger asChild>
            <Button disabled={disabled}>Reservar Habitación</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px] bg-gray-50">
            <DialogHeader>
                <DialogTitle>Formulario de Reserva</DialogTitle>
                <DialogDescription>
                    Procuere llenar los datos con cuidado y validar la veracidad de los mismos.
                </DialogDescription>
            </DialogHeader>
            <Tabs value={`${tabValue}`} className="w-full" activationMode="manual">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="1" >Datos de Reserva</TabsTrigger>
                    <TabsTrigger value="2" >Comparar Datos</TabsTrigger>
                    <TabsTrigger value="3" >Finalizar Reserva</TabsTrigger>
                </TabsList>
                <TabsContent value="1" className="h-[40vh]">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Datos Personales</CardTitle>
                            <CardDescription>
                                Todos los campos son obligatorios.
                            </CardDescription>
                            <div className="flex justify-between w-full">
                                <div className="w-[70%]"><Input id="name" placeholder="Buscar por ci" /></div>
                                <div className="w-[15%]">
                                    <Button type="submit">Agregar Cliente</Button>
                                </div>
                            </div>
                            {/* TODO: hacer un contador con un input de numero para asignar dias por habitacion y la opcion de poner a todos un dia */}
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <div className="flex flex-col w-[45%]">
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-black">Nombre Completo</Label>
                                    <Input id="name" placeholder="Pedro Duarte" />
                                </div>
                                <br />
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-black">CI/Pasaporte</Label>
                                    <Input id="name" placeholder="12345678" />
                                </div>
                            </div>
                            <div className="flex flex-col w-[45%] mt-0">
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
                <TabsContent value="2" className="h-[40vh]">
                    <Card className="h-full flex flex-col">
                        <CardHeader className="flex flex-row justify-between">
                            <CardTitle>Compara los datos</CardTitle>
                            <p>Total a pagar: 320 Bs.</p>
                        </CardHeader>
                        <CardContent className="flex pb-6 flex-grow">
                            <div className="w-[50%] pr-[5%]">
                                <div className="space-y-1 flex gap-20">
                                    <PersonalDataDialog label="Nombre Completo:" value="Pedro Duarte" />
                                    <PersonalDataDialog label="CI/Pasaporte:" value="12345678" />
                                </div>
                                <div className="space-y-1 flex gap-12">
                                    <PersonalDataDialog label="Correo:" value="pedro@gmail.com" />
                                    <PersonalDataDialog label="WhatssApp:" value="+5916877152" />
                                </div>
                                <div className="space-y-1 flex justify-between">
                                    <PersonalDataDialog label="Cantidad:" value="5" />
                                    {/* <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" /> */}
                                </div>
                                <div className="space-y-1 flex gap-12">
                                <PersonalDataDialog label="Fecha de entrada:" value="01/11/24" />
                                <PersonalDataDialog label="Fecha(s) de salida:" value="15/11/24, 16/11/24" />
                                </div>
                            </div>
                            <div className="w-[50%] flex flex-col">
                                <h3 className="h-6">Lista de Habitaciones a Reservar</h3>
                                <div className="flex flex-col overflow-auto h-10 flex-grow gap-1">
                                    <RoomCountItem />
                                    <RoomCountItem />
                                    <RoomCountItem />
                                    <RoomCountItem />
                                    <RoomCountItem />
                                    <RoomCountItem />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="3" className="h-[40vh]">
                    <Card className="h-full">
                        <CardHeader className="flex justify-between">
                            <CardTitle>Imprime el comprobante de reserva</CardTitle>
                            <p>Puedes imprimir, enviar al correo o por WhatssApp</p>
                        </CardHeader>
                        <CardContent className="space-y-2 flex">
                            <div className="w-[50%] pr-[5%]">
                                <h3>Previsualizar comprobante</h3>
                                <br />
                                <div className="w-[100%] h-[100%] bg-blue-100 flex justify-center items-center">
                                    <p>Datos sin cargar</p>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h3 className="my-2">Métodos para compartir el comprobante</h3>
                                <div className="flex flex-col overflow-y-auto h-[160px]">
                                    <p>Selecciona los receptores</p>
                                    <div className="flex items-center gap-2"><Checkbox checked /> <p>por WhatssApp</p></div>
                                    <div className="flex items-center gap-2"><Checkbox checked/> <p>por Correo</p></div>
                                    <div className="flex items-center gap-1">
                                    <Button>Enviar el recibo</Button>
                                    <Button>Imprimir</Button>
                                    </div>
                                    <Button className="my-1">Enviar e imprimir</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <DialogFooter>
                <div className="flex w-full justify-between">
                    <Button className={`${tabValue==1?'invisible':''}`} onClick={()=>{setTabValue(tabValue == 1?1:tabValue-1)}}>Anterior</Button>
                    {tabValue != 2
                    ?<Button onClick={()=>{setTabValue(tabValue < 3?tabValue+1:3)}}>{`${tabValue == 3?'Terminar reserva':'Siguiente'}`}</Button>
                    :<Button onClick={()=>{setTabValue(tabValue < 3?tabValue+1:3)}}>Realizar reserva</Button>
                    }
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}