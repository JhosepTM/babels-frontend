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
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RegisterCustomerDialog } from "./RegisterCustomerDialog"
import { AssingCustomerRoomDialog } from "./AssingCustomerRoomDialog"
import { CustomerModel, CustomerRoomModel } from "@/modules/booking/models/customer"
import { SearchCustomer } from "./components/SearchCustomer"
import { RoomModel } from "@/modules/booking/models/room"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { createBooking } from "@/modules/booking/services/booking-service"
import generateTicket from "@/modules/booking/utils/Ticket"
import { EmailModel } from "@/modules/booking/models/email"
import { sendEmailCustomer } from "@/modules/booking/services/send-email-service"
import { calcularMontoPago } from "@/modules/booking/utils/calculate"

interface BookingRoomDialogProps {
    disabled?: boolean
    listRooms: RoomModel[]
    generateListBookingRoom: (nights: number) => CustomerRoomModel[]
    deleteRoom: (room: RoomModel) => void
}
export const BookingRoomDialog = ({disabled = false, listRooms, deleteRoom, generateListBookingRoom}: BookingRoomDialogProps) => {
    const [tabValue, setTabValue] = useState(1)
    // const [booking, setBooking] = useState<BookingModel>()

    const [customer, setCustomer] = useState<CustomerModel>()
    const [customerList, setCustomerList] = useState<CustomerModel[]>([])
    const [assingCustomersRoom, setAssingCustomersRoom] = useState<CustomerRoomModel[]>([])
    const [nightsOfBooking, setNightsOfBooking] = useState(1)
    const [assingIdCustomers, setAssingIdCustomers] = useState<string[]>([])
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [payStatus, setPayStatus] = useState('PENDIENTE')
    const [sendEmail, setSendEmail] = useState(false)

    const [base64, setBase64] = useState('')
    const [message, setMessage] = useState('')

    const onGenerateTicket = async (output) => {
        setMessage('');
    
        const response = await generateTicket(output, assingCustomersRoom);
    
        if (!response?.success) {
          alert(response?.message);
          return;
        }
    
        if (output === 'b64') {
          setBase64(response?.content ?? '');
        }
    
        setMessage(response?.message);
    
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }

    const getListCustomer = () => {
         console.log('.......')
        const res = []
        const customerAux = assingIdCustomers.find((c)=> c === customer?.id)
        if (customerAux === undefined) {
            res.push(customer)
        }
        const customerAuxList = customerList.filter((customer)=> !assingIdCustomers.includes(customer.id))
        customerAuxList.forEach((c)=>res.push(c))
        return res
    }

    const addIdAddingListCustomer = (id: string) => {
        setAssingIdCustomers([id, ...assingIdCustomers])
        console.log(assingIdCustomers.length, '-----------------dddddddddddddddd')
    }

    const removeIdAddingListCustomer = (id: string) => {
        // console.log(id,'....',Date.now())
        // const auxList = assingIdCustomers.filter((c)=>!(c === id))
        // console.log(auxList,'....',auxList.length)
        // setAssingIdCustomers(auxList)
        setAssingIdCustomers((list)=>{
            return list.filter((c)=>!(c === id))
        })
    }

    useEffect(()=>{
        const auxlist = generateListBookingRoom(nightsOfBooking)
        console.log(auxlist.length)
        setAssingCustomersRoom(auxlist)
        // console.log(listRooms.length,'----')
        // listRooms.forEach((room)=>{
        //     console.log(room.nameRoom, '------', assingCustomersRoom.length)
        //     const roomAdd = assingCustomersRoom.find((r)=> r.room.idRoom == room.idRoom)
        //     console.log(roomAdd)
        //     if(roomAdd === undefined) {
        //         console.log('sssssssssssssssssss')
        //         const roomA: CustomerRoomModel = {
        //             listCustomer: [],
        //             nightsOfBooking: 2,
        //             room: room
        //         } 
        //         setAssingCustomersRoom([...assingCustomersRoom, roomA])
        //         console.log(room.nameRoom)
        //     }
        // })
    },[listRooms])

    return <Dialog open={open} onOpenChange={(e)=>{
        setOpen(e)
        setCustomer(undefined)
        setCustomerList([])
        setTabValue(1)
    }}>
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
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="1" >Datos de Reserva</TabsTrigger>
                    <TabsTrigger value="2" >Lista de acompañantes</TabsTrigger>
                    <TabsTrigger value="3" >Asignar Habitación</TabsTrigger>
                    <TabsTrigger value="4" >Finalizar Reserva</TabsTrigger>
                </TabsList>
                <TabsContent value="1" className="h-[40vh]">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Datos Personales</CardTitle>
                            <CardDescription>
                                Todos los campos son obligatorios.
                            </CardDescription>
                            <div className="flex justify-between w-full items-center py-6">
                                <div className="w-[70%]">
                                    <SearchCustomer onSelect={(customer)=>{
                                        setCustomer(customer)
                                    }}/>
                                </div>
                                <div className="w-[20%]">
                                    <RegisterCustomerDialog
                                        handleCustomer = {(customer: CustomerModel)=>{
                                            setCustomer(customer)
                                        }}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <div className="flex flex-col w-[45%]">
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-black">Nombre Completo</Label>
                                    <Input id="name" placeholder="Pedro Duarte" disabled value={customer ? `${customer.firstName} ${customer.lastName}`:''}/>
                                </div>
                                <br />
                                <div className="space-y-1">
                                    <Label htmlFor="ci" className="text-black">CI/Pasaporte</Label>
                                    <Input id="ci" placeholder="12345678" disabled value={customer ? customer.ci : ''}/>
                                </div>
                            </div>
                            <div className="flex flex-col w-[45%] mt-0">
                                <div className="space-y-1">
                                    <Label htmlFor="email" className="text-black">Email</Label>
                                    <Input id="email" placeholder="0" disabled value={customer ? customer.email : ''}/>
                                </div>
                                <br />
                                <div className="space-y-1">
                                    <Label htmlFor="phone" className="text-black">Celular (con WhatsApp)</Label>
                                    <Input id="phone" placeholder="+59178584888" disabled value={customer ? customer.phone : ''}/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="2" className="h-[40vh]">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Lista de Acompañantes</CardTitle>
                            <CardDescription>
                                Agregue a los acompañantes del cliente
                            </CardDescription>
                            <div className="flex justify-between w-[95%]">
                                <div className="w-[70%]">
                                    <SearchCustomer onSelect={(customer)=>{
                                        setCustomerList([...customerList, customer])
                                    }}/>
                                </div>
                                <div className="w-[15%]">
                                    {/* <Button type="submit">Agregar Cliente</Button> */}
                                    <RegisterCustomerDialog
                                        handleCustomer = {(customer: CustomerModel)=>{
                                            setCustomerList([...customerList, customer])
                                        }}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex pb-6 flex-grow overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="">Nombre completo</TableHead>
                                    <TableHead>CI/Pasaporte</TableHead>
                                    <TableHead>Celular</TableHead>
                                    <TableHead className="w-[100px] text-right">Edad</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customerList.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell className="font-medium">{`${customer.firstName} ${customer.lastName}`}</TableCell>
                                        <TableCell>{customer.ci}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell className="text-right">{(new Date(Date.now())).getFullYear() - new Date(customer.birthdate).getFullYear()}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="3" className="h-[40vh]">
                    <Card className="h-full">
                        <CardHeader className="flex justify-between">
                            <CardTitle>Asignar habitaciones</CardTitle>
                            <div className="flex justify-between">
                                <div className="w-[19%]">
                                    <Label>Noches de hospedaje</Label>
                                    <Input 
                                        id="firstName"
                                        value={nightsOfBooking}
                                        type="number"
                                        autoComplete="off"
                                        onChange={(e)=>{
                                            const nights = parseInt(e.target.value)
                                            setNightsOfBooking(nights)
                                            const newList = assingCustomersRoom.map((acr)=>{
                                                acr.setNightsOfBooking = nights
                                                return acr
                                            })
                                            setAssingCustomersRoom(newList)
                                        }}
                                        />
                                </div>
                                <div className="w-[20%]">
                                    <p>Fecha de entrada</p>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[150px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Fecha de inicio</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="w-[20%]">
                                    <p>Estado del pago</p>
                                    <RadioGroup defaultValue={payStatus} onValueChange={(e)=>{
                                        setPayStatus(e)
                                    }}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="REALIZADO" id="REALIZADO"/>
                                            <Label htmlFor="REALIZADO">Pago realizado</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="PENDIENTE" id="PENDIENTE" />
                                            <Label htmlFor="PENDIENTE">Pago pendiente</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="w-[30%]">
                                    <p>Clientes por asignar: {customerList.length+1}</p>
                                    <h2 className="font-semibold">Total {calcularMontoPago(assingCustomersRoom)} Bs.</h2>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex pb-6 flex-grow flex-col h-[25vh] overflow-auto relative">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">Nombre</TableHead>
                                        <TableHead className="w-[110px] bg-green-300">Precio por Noche (Bs.)</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead className="w-[50px]">Capacidad</TableHead>
                                        <TableHead className="w-[100px]">Cant de Pers.</TableHead>
                                        <TableHead className="w-[100px]">Cant de Noches</TableHead>
                                        <TableHead className="bg-gray-200 text-center">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                    assingCustomersRoom.map((acr, i) => {
                                        // console.log(acr.getRoom.idRoom)
                                    // const roomAdd = assingCustomersRoom.find((r)=> r.room.id == room.id)
                                    // if(roomAdd === undefined) {
                                    //     const roomA: CustomerRoomModel = {
                                    //         listCustomer: [],
                                    //         nightsOfBooking: 2,
                                    //         room: room
                                    //     } 
                                    //     setAssingCustomersRoom((list)=>{
                                    //         console.log(list.length,'............')
                                    //         return [...list, roomA]
                                    //     })
                                    //     console.log(room.nameRoom)
                                    // }
                                    return (
                                    <TableRow key={acr.getRoom ? acr.getRoom.idRoom:''+'-'+i}>
                                        <TableCell className="font-medium">{acr.getRoom ? acr.getRoom.nameRoom:''}</TableCell>
                                        <TableCell className="bg-green-100">{acr.getRoom ? acr.getRoom.price:''}</TableCell>
                                        <TableCell>{acr.getRoom ? acr.getRoom.roomType:''}</TableCell>
                                        <TableCell className="text-right">{acr.getRoom ? acr.getRoom.capacity:''}</TableCell>
                                        <TableCell className="text-right">{acr.getRoom ? acr.getListCustomer?.length:''}</TableCell>
                                        <TableCell className="text-right">{acr.getRoom ? acr.getNightsOfBooking:''}</TableCell>
                                        <TableCell className="flex justify-around bg-gray-100">
                                            <AssingCustomerRoomDialog 
                                                roomId={`${acr.getRoom ? acr.getRoom.idRoom:''}`}
                                                capacity={acr.getRoom ? acr.getRoom.capacity:1}
                                                assingIdCustomers={assingIdCustomers}
                                                getCustomerList={getListCustomer}
                                                customerRoomList={assingCustomersRoom}
                                                setCustomerRoomList={setAssingCustomersRoom}
                                                addIdAddingListCustomer={addIdAddingListCustomer}
                                                removeIdAddingListCustomer={removeIdAddingListCustomer}/>
                                            <Button variant={"destructive"} onClick={()=>{deleteRoom(acr.getRoom)}}>Quitar</Button>
                                        </TableCell>
                                    </TableRow>
                                    )})}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="4" className="h-[40vh]">
                    <Card className="h-full">
                    <CardHeader className="flex justify-between pt-2 pb-2">
                            
                        </CardHeader>
                        <div className="space-y-2 flex h-[100%] px-4 py-2">
                            <div className="w-[50%] pr-[5%]">
                                <div className="w-[100%] h-[90%] flex justify-center items-center">
                                    {base64 && (
                                        <iframe
                                        src={`data:application/pdf;base64,${base64}`}
                                        className="mx-iframe h-full"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow justify-between">
                                <h3 className="font-bold text-lg">Imprime el comprobante de reserva</h3>
                                <h3 className="my-2">Métodos para compartir el comprobante</h3>
                                <p>Puedes imprimir, enviar al correo o por WhatssApp</p>
                                <div className="flex flex-col overflow-y-auto h-[160px]">
                                    <p>Selecciona los receptores</p>
                                    {/* <div className="flex items-center gap-2"><Checkbox checked /> <p>por WhatssApp</p></div> */}
                                    <div className="flex items-center gap-2"><Checkbox checked={sendEmail} onCheckedChange={()=>setSendEmail(!sendEmail)}/> <p>por Correo</p></div>
                                    <div className="flex items-center gap-1">
                                    <Button
                                    onClick={async () => {
                                        const email: EmailModel = {
                                            destinatario: "tmjhosep@gmail.com",
                                            asunto: "Comprobante de reserva",
                                            mensaje: `${customer?.firstName} ${customer?.lastName}.`,
                                            file: base64
                                        }
                                        try {
                                            // const result = await sendEmailCustomer(email);

                                            toast.promise(sendEmailCustomer(email), {
                                            loading: 'Enviando correo...',
                                            success: () => {
                                                return `El correo fue enviado exitosamente`;
                                            },
                                            error: 'Error al enviar el correo',
                                            });
                                            
                                        } catch (error) {
                                        console.error(error);
                                        }
                                    }}
                                    disabled={!sendEmail}
                                    >Enviar el recibo</Button>
                                    <Button
                                    onClick={() => onGenerateTicket('print')}
                                    >Imprimir</Button>
                                    </div>
                                    <Button className="my-1"
                                    disabled={!sendEmail}
                                    >Enviar e imprimir</Button>
                                    {message && <p className="mx-alert-info">{message}</p>}
                                    
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
            <DialogFooter>
                <div className="flex w-full justify-between">
                    <Button className={`${tabValue==1?'invisible':''}`} onClick={()=>{setTabValue(tabValue == 1?1:tabValue-1)}}>Anterior</Button>
                    {tabValue != 3
                    ?<Button onClick={()=>{setTabValue(tabValue < 3?tabValue+1:3)}} disabled={tabValue == 1 && customer == null}>{`${tabValue == 3?'Terminar reserva':'Siguiente'}`}</Button>
                    :<Button onClick={()=>{
                            setTabValue(tabValue < 3?tabValue+1:4)
                            onGenerateTicket('b64')
                            // try {
                            //     const roomBookings = assingCustomersRoom.flatMap((a) => {
                            //         return a.getListCustomer?.map((c) => {
                            //             return {
                            //                 "idRoom": a.getRoom ? a.getRoom.idRoom : 0,
                            //                 "idCustomer": c.id,
                            //                 "checkIn": "2024-06-02T21:29:18.188Z",
                            //                 "checkOut": "2024-06-02T21:29:18.188Z",
                            //                 "roomPrice": a.getRoom ? a.getRoom.price : 0
                            //             }
                            //         })
                            //     })
                            //    const res = {
                            //     "bookingDto": {
                            //         "paymentStatus": payStatus,
                            //     },
                            //     "customer": customer,
                            //     "roomBookings": roomBookings
                            //    }
                            //    console.log(res)
                            //    createBooking(res)
                            //     toast.success('Reserva realizada con éxito.')
                            // } catch (error) {
                            //     toast.error('No se realizo la reserva intentelo de nuevo.')
                            // }
                        }}
                        >Realizar reserva</Button>
                    }
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}