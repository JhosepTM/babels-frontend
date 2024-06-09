import { Button } from "@/components/ui/button"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { BookingRoomDialog } from "./BookingRoomDialog"
import { RoomItem } from "./RoomItem"
import { useEffect, useState } from "react"
import { RoomModel } from "@/modules/booking/models/room"
import { getRoomsByStateAndType } from "@/modules/booking/services/booking-service"
import { CustomerModel, CustomerRoomModel } from "@/modules/booking/models/customer"

export const AvailableRooms = () => {
    const [paginaHabitacion, setPaginaHabitacion] = useState(1)
    const [listRoom, setListRoom] = useState<RoomModel[]>([])
    const [selectedRoom, setSelectedRoom] = useState<RoomModel[]>([])
    const [type, setType] = useState('SIMPLE')
    const state = 'DISPONIBLE'
    // let type = 'SIMPLE'

    const addSelectedRoom = (room: RoomModel)=>{
        setSelectedRoom([room, ...selectedRoom])
        localStorage.setItem('selectedRoom', JSON.stringify([room, ...selectedRoom]));
        const filter = listRoom.filter((e)=>e.id != room.id)
        setListRoom(filter)
    }

    const removeSelectedRoom = (room: RoomModel)=>{
        const list = selectedRoom.filter((r)=>r.id !== room.id)
        setSelectedRoom(list)
        setListRoom([room, ...listRoom])
        localStorage.setItem('selectedRoom', JSON.stringify(list));
    }

    const generateListBookingRoom = (nights: number) => {
        const res: CustomerRoomModel[] = []
        console.log(selectedRoom.length)
        selectedRoom.forEach((room)=>{
            console.log(room.nameRoom)
            // const roomA: CustomerRoomModel = {
            //     listCustomer: [],
            //     nightsOfBooking: nights,
            //     room: room
            // } 
            const roomA = new CustomerRoomModel()
            roomA.setNightsOfBooking = nights
            roomA.setRoom = room

            res.push(roomA)
        })
        console.log(res.length)
        return res as CustomerRoomModel[]
    }

    useEffect(()=>{
        // setListRoom(listRooms)
        cargarHabitaciones()
        const jsonStorage = localStorage.getItem('selectedRoom')
        if (jsonStorage){
            const listStorage = JSON.parse(jsonStorage)
            setSelectedRoom(listStorage)
        }
        //TODO: cada que se cierre la sesión que se elimine la variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type])

    const cargarHabitaciones = async ()=>{
        console.log(type)
        const lista = await getRoomsByStateAndType(type, state)
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
                        <span className="font-semibold text-white">Habitaciones Disponibles</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={90} minSize={90} maxSize={90}>
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={15} minSize={15} maxSize={15}>
                            <div className="flex flex-col h-[200px] justify-center p-6">
                                <h2 className="mb-2 text-lg font-semibold tracking-tight">Tipo de Habitación </h2>
                                <Button variant="outline"
                                    className={`mb-2 ${paginaHabitacion == 1 ? 'bg-gray-200' : ''}`}
                                    onClick={() => {
                                        setPaginaHabitacion(1)
                                        setType('SIMPLE')
                                    }}
                                >Simple</Button>
                                <Button variant="outline"
                                    className={`mb-2 ${paginaHabitacion == 2 ? 'bg-gray-200' : ''}`}
                                    onClick={() => {
                                        setPaginaHabitacion(2)
                                        setType('DOBLE')
                                    }}
                                >Doble</Button>
                                <Button variant="outline"
                                    className={`mb-2 ${paginaHabitacion == 3 ? 'bg-gray-200' : ''}`}
                                    onClick={() => {
                                        setPaginaHabitacion(3)
                                        setType('MATRIMONIAL')
                                    }}
                                >Matrimonial</Button>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                                    <div className="h-full grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5 overflow-auto">
                                        {
                                            listRoom.map((room, index)=><RoomItem key={`${room.id}-${room.nameRoom}-${index}`} room={room} addSelectedRoom={addSelectedRoom} removeSelectedRoom={removeSelectedRoom}/>)
                                        }
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
                                    <div className="flex flex-col h-full items-center justify-between p-6 bg-gray-100">
                                        <h3 className="mb-2 text-sm font-semibold tracking-tight">Habitaciones Seleccionadas</h3>
                                        <BookingRoomDialog 
                                            disabled={selectedRoom.length == 0} 
                                            listRooms={selectedRoom} 
                                            deleteRoom={removeSelectedRoom}
                                            generateListBookingRoom={generateListBookingRoom}
                                        />
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel>
                                    <div className="flex flex-col h-full p-3 bg-gray-100 gap-2 overflow-auto">
                                        {
                                            selectedRoom.length>0
                                            ?selectedRoom.map((room, index)=><RoomItem key={`${room.id}-${room.nameRoom}-${index}`} room={room}  addSelectedRoom={addSelectedRoom} removeSelectedRoom={removeSelectedRoom} select/>)
                                            :<p className="p-8 text-center">No se tiene habitaciones seleccionadas</p>
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
