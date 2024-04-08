import { RoomDetail } from "./RoomDetail"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RoomModel } from "@/modules/booking/models/room"

export interface RoomItemProps {
    select?: boolean,
    room: RoomModel,
    addSelectedRoom: (room: RoomModel)=>void,
    removeSelectedRoom: (room: RoomModel)=>void,
}
export const RoomItem = ({select = false, room, addSelectedRoom, removeSelectedRoom}: RoomItemProps) => {
    return (
        <Card className={`w-auto p-2 ${!select?'hover:scale-105':''}`}>
            <CardHeader>
                <CardTitle>Habitación #{room.numberRoom}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-between">
                    <div className="mb-3">
                        <p>Personas por habitación: 2</p>
                        <p>Tipo de habitación</p>
                    </div>
                    <div className="flex items-center w-full justify-between">
                        <RoomDetail />
                        {select
                        ?<Button
                            className="bg-red-400"
                            onClick={()=>removeSelectedRoom(room)}>Quitar</Button>
                        :<Button onClick={()=>addSelectedRoom(room)}>Seleccionar</Button>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}