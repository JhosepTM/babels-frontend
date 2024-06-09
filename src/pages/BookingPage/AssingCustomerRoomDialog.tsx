import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Combobox } from "./components/ComboBox"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CustomerModel, CustomerRoomModel } from "@/modules/booking/models/customer"
import { RoomModel } from "@/modules/booking/models/room"

interface AssingCustomerRoomDialogProps {
    roomId: string,
    capacity: number,
    assingIdCustomers: string[],
    getCustomerList: ()=>(CustomerModel|undefined)[],
    customerRoomList: CustomerRoomModel[],
    setCustomerRoomList: Dispatch<SetStateAction<CustomerRoomModel[]>>,
    addIdAddingListCustomer: (id: string) => void,
    removeIdAddingListCustomer: (id: string) => void,
}

export const AssingCustomerRoomDialog = ({
    roomId,
    capacity,
    assingIdCustomers,
    getCustomerList,
    customerRoomList,
    setCustomerRoomList,
    addIdAddingListCustomer,
    removeIdAddingListCustomer
}: AssingCustomerRoomDialogProps) => {
    const [interCustomerList, setInterCustomerList] = useState<CustomerModel[]>([])
    const [interRoomCustomer, setInterRoomCustomer] = useState<CustomerRoomModel>()
    const [selectedCustomers, setSelectedCustomers] = useState<CustomerModel[]>([])
    const [open, setOpen] = useState(false)
    const [nights, setNights] = useState(0)

    const addSelectCustomer = (customer: CustomerModel)=>{
        addIdAddingListCustomer(customer.id)
        setSelectedCustomers([customer, ...selectedCustomers])

        const listAux = interCustomerList.filter((c) => c.id !== customer.id)
        setInterCustomerList(listAux)
    }

    const removeSelectCustomer = (id: string) => {
        removeIdAddingListCustomer(id)

        const customerAux = selectedCustomers.find((c) => c.id === id)
        if(customerAux) {
            setInterCustomerList([customerAux, ...interCustomerList])
        }

        const listAux = selectedCustomers.filter((c) => c.id === id)
        setSelectedCustomers(listAux)
    }

    const handleCancelClose = () => {
        console.log(selectedCustomers.length)
        selectedCustomers.map((c)=>{
            console.log(c.id)
            removeIdAddingListCustomer(c.id)
        })
        setSelectedCustomers([])
    }

    const handleAcept = () => {
        console.log(selectedCustomers)
        console.log(roomId)
        console.log(customerRoomList.length)
        const a = customerRoomList.find((cr)=> cr.getRoom?.idRoom === parseInt(roomId))
        if(a){
            a.setListCustomer = selectedCustomers
            a.setNightsOfBooking = nights
            console.log(a)

            const newList = customerRoomList.filter((cr)=> cr.getRoom?.idRoom !== parseInt(roomId))
            setCustomerRoomList([...newList, a as CustomerRoomModel])
        }
        setOpen(false)
    }

    useEffect(()=>{
        console.log('áaaaaaaa')
        const list = getCustomerList()
        if(list != undefined){
            setInterCustomerList(list as CustomerModel[])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[assingIdCustomers])

    useEffect(()=>{
        if(open){
            const auxtA = customerRoomList.find((cr)=> cr.getRoom?.idRoom === parseInt(roomId))
            setInterRoomCustomer(auxtA)
            setNights(auxtA?.getNightsOfBooking ?? 0)
        }
    },[open])
    return (
        <Dialog open={open} onOpenChange={(e)=>{
            setOpen(e)
            console.log(e)
            if(!e){
                handleCancelClose()
            }
        }}>
        <DialogTrigger asChild>
            <Button >Asignar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px] bg-gray-50" >
            <DialogHeader>
                <DialogTitle>Asignar huéspedes a habitaciones</DialogTitle>
                <DialogDescription>
                    Personas por habitación: 3
                </DialogDescription>
            </DialogHeader>
            <Card>
            <CardContent className="flex justify-between pt-5 items-start">
                <div className="flex flex-col w-[85%]">
                    <div className="w-[70%] m-4">
                        <Label>Espacios disponibles</Label>
                        <div className="mt-4">
                            {Array.from({length: capacity}, (v,i) => (
                                <Combobox
                                    key={`combo-box-${i}`}
                                    listCustomer={interCustomerList} 
                                    addSelectedCustomer={addSelectCustomer} 
                                    removeSelectCustomer={removeSelectCustomer}
                                    onDeleteCustomer={(c)=>{
                                        console.log(c)
                                    }}
                                    valueInit={interRoomCustomer != undefined? interRoomCustomer.getListCustomer? interRoomCustomer.getListCustomer[i]:null:null}
                                />
                            ))}  
                        </div>    
                    </div>
                    <div className="w-[30%] m-4">
                        <Label>Noches de hospedaje</Label>
                        <Input className="mt-4" type="number" value={nights} onChange={(e)=>setNights(parseInt(e.target.value))} autoComplete="off"/>
                    </div>
                </div>
            </CardContent>
            </Card>
            <DialogFooter>
                <Button type="submit" onClick={handleAcept}>Guardar</Button>
                <DialogClose asChild>
                    <Button variant={"outline"}>Cancelar</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}