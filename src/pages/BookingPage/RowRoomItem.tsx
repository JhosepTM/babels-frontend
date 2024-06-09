import { BookingDetailModel } from "@/modules/booking/models/booking"
import { BookingDetailDialog } from "./BookingDetailDialog"
import { typeBookingDetail } from "@/modules/booking/enums/booking-enum"

interface RowRoomItemProps {
    bookingDetailModel: BookingDetailModel
    type: typeBookingDetail
    idBooking: number
    recargarLista: ()=> Promise<void> | null
}
export const RowRoomItem = ({bookingDetailModel, type, idBooking, recargarLista}: RowRoomItemProps) => {

    const formatearFecha = (fecha: Date) =>{
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();
    
        return `${(dia < 10) ? '0' + dia : dia}/${(mes < 10) ? '0' + mes : mes}/${anio}`;
    }
    return (
        <div className="grid grid-cols-5 gap-4 bg-gray-100 border-solid border-gray-600 items-center my-2 p-4 rounded-sm">
            <p>Código: {bookingDetailModel.code}</p>
            <p>Nombre: {bookingDetailModel.customerBooking.firstName} {bookingDetailModel.customerBooking.lastName}</p>
            <p>CI/Passport: {bookingDetailModel.customerBooking.ci}</p>
            <p>Fecha reserva: {formatearFecha(new Date(bookingDetailModel.createdAt))}</p>
            <BookingDetailDialog bookingDetailModel={bookingDetailModel} type={type} idBooking={idBooking} recargarLista={recargarLista}/>
        </div>
    )
}