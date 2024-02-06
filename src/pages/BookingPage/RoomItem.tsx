import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export const RoomItem = () => {
    return <Button variant="outline" className="h-[100px]">
        <div className="mr-4">
            <h3 className="font-bold">Habitación #3</h3>
            <p>Personas por habitación: 2</p>
            <p>Tipo de habitación</p>
        </div>
        <div>
            <Checkbox id="terms" />
        </div>
    </Button>
}