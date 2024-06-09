import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomerModel } from "@/modules/booking/models/customer"
import { formatearFecha } from "@/modules/booking/utils/fechas"

interface GuestDialogProps {
    customerList: CustomerModel[]
}
export const GuestDialog = ({customerList}: GuestDialogProps) => {
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >Ver huéspedes</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] bg-gray-50">
                <DialogHeader>
                    <DialogTitle>Lista de húespedes de la habitación</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardContent className="flex flex-col justify-between pt-5 items-start gap-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Nombre completo</TableHead>
                                    <TableHead>CI/Pasaporte</TableHead>
                                    <TableHead>Celular</TableHead>
                                    <TableHead className="w-[100px] text-right">Fecha de nacimiento</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customerList.map((c) => (
                                    <TableRow key={`item-list-customer-${c.ci??c.passport}-${c.phone}`}>
                                        <TableCell className="font-medium">{c.firstName} {c.lastName}</TableCell>
                                        <TableCell>{c.ci ?? c.passport}</TableCell>
                                        <TableCell>{c.phone}</TableCell>
                                        <TableCell className="text-right">{formatearFecha(new Date(c.birthdate))}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}