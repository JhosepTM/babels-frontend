import { RoomDetail } from "./RoomDetail"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RoomModel, RoomState } from "@/modules/booking/models/room"
import { updateStatusRoom } from "@/modules/booking/services/booking-service"

export interface RoomItemProps {
    select?: boolean,
    room: RoomModel,
    addSelectedRoom: (room: RoomModel)=>void,
    removeSelectedRoom: (room: RoomModel)=>void,
}
export const RoomItem = ({select = false, room, addSelectedRoom, removeSelectedRoom}: RoomItemProps) => {
    return (
        <Card className={`w-auto p-2 ${!select?'hover:scale-105':''} max-h-64  border-solid border-2 ${room.roomType == 'SIMPLE' ? 'bg-[#dfebdf] border-green-700' : room.roomType == 'DOBLE'? 'bg-[#ffecce] border-yellow-500': 'bg-[#fed9ae] border-orange-500'}`}>
            <CardHeader>
                <CardTitle>Habitación {room.nameRoom}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-between">
                    <div className="mb-3">
                        <p>Personas por habitación: {room.numberRoom}</p>
                        <p>Tipo de habitación: {room.roomType}</p>
                        <p>Precio por noche: {room.price} Bs.</p>
                    </div>
                    <div className="flex items-center w-full justify-between">
                        <RoomDetail room={room} />
                        {select
                        ?<Button
                            className="bg-red-400"
                            onClick={async ()=>{
                                room.state = RoomState.DISPONIBLE
                                await updateStatusRoom(room).then(
                                    ()=>{
                                        removeSelectedRoom(room)
                                    }
                                ).catch(()=>{
                                    //algo salido mal
                                })
                                }}>Quitar</Button>
                        :<Button onClick={async ()=>{
                            room.state = RoomState.EN_TRANSITO
                            await updateStatusRoom(room).then(
                                ()=>{
                                    addSelectedRoom(room)
                                }
                            ).catch(()=>{
                                //algo salido mal
                            })
                        }}>Seleccionar</Button>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}