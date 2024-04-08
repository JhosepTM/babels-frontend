import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RoomModel } from "@/modules/booking/models/room"

export interface RoomCheckoutProps {
    room: RoomModel,
}
export const RoomCheckout = ({room}: RoomCheckoutProps) => {
    return (
        <Card className={`w-auto p-2 hover:scale-105`}>
            <CardHeader>
                <CardTitle>Habitación #{room.numberRoom}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-between">
                    <div className="mb-3">
                        <p>Personas por habitación: 2</p>
                        <p>Tipo de habitación</p>
                    </div>
                    <div className="flex items-center w-full justify-center">
                        <Button onClick={()=>{}}>Marcar Salida</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}