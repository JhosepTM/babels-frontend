import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PersonalDataDialog } from "./PersonalDataDialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GuestDialog } from "./GuestsDialog"
import { ChangePaymentStatusDialog } from "./ChangePaymentStatusDialog"
import { BookingDetailModel } from "@/modules/booking/models/booking"
import { paymentStatusTypes, typeBookingDetail } from "@/modules/booking/enums/booking-enum"
import { dialAllCheckIn, dialAllCheckOut, dialOneCheckIn, dialOneCheckOut } from "@/modules/booking/services/booking-service"
import { useState } from "react"
import { toast } from "sonner"

interface BookingDetailDialogProps {
    bookingDetailModel: BookingDetailModel
    type: typeBookingDetail
    idBooking: number
    recargarLista: ()=> Promise<void> | null
}

export const BookingDetailDialog = ({bookingDetailModel, type, idBooking, recargarLista}:BookingDetailDialogProps) => {
    const [open, setOpen] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(bookingDetailModel.paymentStatus)
    return(
        <Dialog open={open} onOpenChange={(e)=>{
            setOpen(e)}}>
        <DialogTrigger asChild>
            <Button >Ver detalle</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px] bg-gray-50">
            <DialogHeader>
                <DialogTitle>Detalle de la reserva</DialogTitle>
            </DialogHeader>
            <Card>
            <CardContent className="flex justify-between pt-5 items-start gap-2">
                <div className="flex flex-col w-[25%]">
                    <div className="bg-gray-100 p-6 rounded">
                        <p className="mb-6">Datos de la reserva</p>
                        <PersonalDataDialog label="Nombre:" value={`${bookingDetailModel.customerBooking.firstName} ${bookingDetailModel.customerBooking.lastName}`} />
                        <PersonalDataDialog label="CI/Passport:" value={`${bookingDetailModel.customerBooking.ci ?? bookingDetailModel.customerBooking.passport}`} />
                        <PersonalDataDialog label="Telefono:" value={`${bookingDetailModel.customerBooking.phone}`} />
                        <PersonalDataDialog label="Correo:" value={`${bookingDetailModel.customerBooking.email}`} />
                        <PersonalDataDialog label="Estado del pago:" value={`${bookingDetailModel.paymentStatus}`} />
                        <PersonalDataDialog label="Monto pagado:" value={`${bookingDetailModel.amountPaid} Bs.`} />
                    </div>
                </div>
                <div className="flex flex-col w-[70%] h-[500px] mt-0 gap-2">
                    <div className="flex justify-between">
                        {
                            type != typeBookingDetail.FINALIZADO 
                            ? paymentStatus == paymentStatusTypes.PENDIENTE
                                ? <ChangePaymentStatusDialog idBooking={idBooking}
                                onChange={()=>{
                                    setPaymentStatus(paymentStatusTypes.REALIZADO)
                                }}/>
                                :null : null
                        }
                        {
                            type == typeBookingDetail.OCUPADO
                            ? !bookingDetailModel.checkOut ? <Button
                            onClick={async ()=>{
                                dialAllCheckOut(idBooking)
                                
                                if(recargarLista){
                                    await recargarLista()
                                }
                                toast.success('Se marco el check-out a todo')
                                setOpen(false)
                            }}
                            disabled={paymentStatus == paymentStatusTypes.PENDIENTE}
                            >Marcar check-out a todo</Button> : <p>Se hizo check-out</p>
                            : type == typeBookingDetail.RESERVADO
                                ? !bookingDetailModel.checkIn 
                                    ? <Button onClick={async ()=>{
                                        dialAllCheckIn(idBooking)
                                        
                                        if(recargarLista){
                                            await recargarLista()
                                        }
                                        toast.success('Se marco el check-in a todo')
                                        setOpen(false)
                                    }}>Marcar check-in a todo</Button> 
                                    : <p>Se hizo check-in</p>
                                : null
                        }
                    </div>
                    <p>Lista de habitaciones</p>
                    <ScrollArea className="flex-grow bg-gray-300 rounded">
                        {
                            bookingDetailModel.roomCustomerDetailList.map((rc)=>{
                                return (<div key={`item-detail-booking-${rc.room.nameRoom}-${rc.room.idRoom}`} className="flex items-center bg-gray-100 border-solid border-gray-600 h-[80px] justify-around m-2">
                                    <PersonalDataDialog label="Nombre habitación:" value={`${rc.room.nameRoom}`} />
                                    <GuestDialog customerList={rc.customerList}/>
                                    {
                                        type == typeBookingDetail.OCUPADO
                                        ? !rc.stateCheckOut ? <Button
                                        onClick={()=>{
                                            dialOneCheckOut(idBooking, rc.room.idRoom)
                                        }}
                                        >Marcar check-out</Button> : <p>Se hizo check-out</p>
                                        : type == typeBookingDetail.RESERVADO
                                            ? !rc.stateCheckIn 
                                                ? <Button
                                                    onClick={()=>{
                                                        dialOneCheckIn(idBooking, rc.room.idRoom)
                                                    }}
                                                    >Marcar check-in</Button> 
                                                : <p>Se hizo check-in</p>
                                            : null
                                    }
                                </div>)
                            })
                        }
                        
                    </ScrollArea>
                </div>
            </CardContent>
            </Card>
        </DialogContent>
    </Dialog>
    )
}