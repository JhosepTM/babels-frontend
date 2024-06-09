import { Button } from "@/components/ui/button"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useEffect, useState } from "react"
import { RoomModel } from "@/modules/booking/models/room"
import { RoomCheckout } from "./RoomCheckout"
import { getAllBookingDetailReserved, getRoomsByStateAndType } from "@/modules/booking/services/booking-service"
import { RowRoomItem } from "./RowRoomItem"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { BookingDetailModel } from "@/modules/booking/models/booking"
import { typeBookingDetail } from "@/modules/booking/enums/booking-enum"

export const CheckInRooms = () => {
    const [listRoom, setListRoom] = useState<BookingDetailModel[]>([])
    const [valueSearch, setValueSearch] = useState('')

    useEffect(()=>{
        // setListRoom(listRooms)
        cargarHabitaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[valueSearch])

    const cargarHabitaciones = async ()=>{
        const lista = await getAllBookingDetailReserved(valueSearch)
        setListRoom(lista);
    }
    return (
        <ResizablePanelGroup
            direction="vertical"
            className="rounded-lg border m-10 mt-2"
            style={{ boxShadow: "3px 7px 20px 0px rgba(0, 0, 0, 0.25)" }}
        >
            <ResizablePanel defaultSize={10} minSize={10} maxSize={10}>
                <div className="flex h-full items-center justify-center p-6 bg-black">
                    <span className="font-semibold text-white">Marcar Entrada</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={90} minSize={90} maxSize={90}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={12} minSize={12} maxSize={12}>
                        <div className="flex gap-2 pt-3 p-5">
                            <h2 className="mb-2 text-lg font-semibold tracking-tight">Buscar reserva</h2>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Buscar por CÓDIGO de reserva"
                                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                    value={valueSearch}
                                    onChange={(e)=>setValueSearch(e.target.value.toUpperCase())}
                                />
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                                <div className="h-full md:p-1 xl:p-2 overflow-auto">
                                    {
                                        listRoom.length > 0
                                        ? listRoom.map((e, i)=><RowRoomItem 
                                                key={`row-item-${i}`} 
                                                bookingDetailModel={e} 
                                                type={typeBookingDetail.RESERVADO}
                                                idBooking={e.idBooking}
                                                recargarLista={async ()=>{
                                                    setListRoom([])
                                                    await cargarHabitaciones()
                                                }}/>)
                                        : <p className="text-center">No hay elmentos para mostrar</p>
                                    }
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}