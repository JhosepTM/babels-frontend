import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-label"
import { Card } from "@tremor/react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { updatePaymentStatus } from "@/modules/booking/services/booking-service"
import { toast } from "sonner"

interface ChangePaymentStatusDialogProps {
    idBooking: number,
    onChange: () => void | null
}
export const ChangePaymentStatusDialog = ({idBooking, onChange}: ChangePaymentStatusDialogProps) => {
    const [payStatus, setPayStatus] = useState('PENDIENTE')
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={(e)=>{
            setOpen(e)
        }}>
            <DialogTrigger asChild>
                <Button >Cambiar estado del pago</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] bg-gray-50">
                <DialogHeader>
                    <DialogTitle>Cambiar estado del pago</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardContent className="flex flex-col justify-center pt-5 items-center gap-2">
                       <Label>Estado del pago</Label>
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
                    </CardContent>
                </Card>
            <DialogFooter>
            <Button onClick={()=>{
                setOpen(false)
                updatePaymentStatus(idBooking, payStatus)
                toast.success('Se cambio el estado exitosamente')
                if(onChange){
                    onChange()
                }
            }}>Guardar</Button>
                <Button
                onClick={()=>{
                    setOpen(false)
                }}
                variant={"outline"}>Cancelar</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}