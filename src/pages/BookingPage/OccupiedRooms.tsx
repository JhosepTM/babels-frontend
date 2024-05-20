import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RoomItem } from "./RoomItem"
import { useEffect, useState } from "react"
import { listRooms } from "./fake"
import { RoomModel } from "@/modules/booking/models/room"
import { RoomCheckout } from "./RoomCheckout"

export const OccupiedRooms = () => {
    const [paginaHabitacion, setPaginaHabitacion] = useState(1)
    const [listRoom, setListRoom] = useState<RoomModel[]>([])
    const [selectedRoom, setSelectedRoom] = useState<RoomModel[]>([])

    const addSelectedRoom = (room: RoomModel) => {
        setSelectedRoom([room, ...selectedRoom])
    }

    const removeSelectedRoom = (room: RoomModel) => {
        const list = selectedRoom.filter((r) => r.id !== room.id)
        setSelectedRoom(list)
    }

    useEffect(() => {
        setListRoom(listRooms)
    }, [])
    return (
        <ResizablePanelGroup
            direction="vertical"
            className="rounded-lg border m-10 mt-2"
            style={{ boxShadow: "3px 7px 20px 0px rgba(0, 0, 0, 0.25)" }}
        >
            <ResizablePanel defaultSize={10} minSize={10} maxSize={10}>
                <div className="flex h-full items-center justify-center p-6 bg-black">
                    <span className="font-semibold text-white">Habitaciones Ocupadas</span>
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
                                onClick={() => setPaginaHabitacion(1)}
                            >Simple</Button>
                            <Button variant="outline"
                                className={`mb-2 ${paginaHabitacion == 2 ? 'bg-gray-200' : ''}`}
                                onClick={() => setPaginaHabitacion(2)}
                            >Doble</Button>
                            <Button variant="outline"
                                className={`mb-2 ${paginaHabitacion == 3 ? 'bg-gray-200' : ''}`}
                                onClick={() => setPaginaHabitacion(3)}
                            >Matrimonial</Button>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={15} minSize={15} maxSize={15}>
                                <div className="flex h-full items-center justify-between p-6 bg-gray-200">
                                    <h1>Habitaciones Simples</h1>
                                    <div className="flex items-center">
                                        <p className="mx-2">Calidad de la Habitación: </p>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Básico" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Básico</SelectItem>
                                                <SelectItem value="dark">Medio</SelectItem>
                                                <SelectItem value="system">Gold</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                                <div className="h-full grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5 overflow-auto">
                                    {
                                        listRoom.map((room) => <RoomCheckout room={room}/>)
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