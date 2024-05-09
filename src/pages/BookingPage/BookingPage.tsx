import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  


export const BookingPage = () => {
    return <>
        <h2>Sistema de Reservas</h2>
        <Tabs defaultValue="available" className="w-full h-full bg-blue-500">
            <TabsList>
                <TabsTrigger value="available">Disponible</TabsTrigger>
                <TabsTrigger value="occupied">Ocupado</TabsTrigger>
                <TabsTrigger value="history_booking">Historial de reservas</TabsTrigger>
            </TabsList>
            <TabsContent value="available">
                <p>Personas por habitación</p>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <p>Reservar habitación</p>
                <Tabs defaultValue="essential" className="flex w-full">
                    <TabsList className="flex-col h-full w-[100px] mr-4">
                        <TabsTrigger value="essential">Básico</TabsTrigger>
                        <TabsTrigger value="middle">Medio</TabsTrigger>
                        <TabsTrigger value="gold">Gold</TabsTrigger>
                        <TabsTrigger value="all">Todas</TabsTrigger>
                    </TabsList>
                    <div className="bg-red-500 w-full border-2 rounded-lg p-2 box-content">
                        <TabsContent value="essential">
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>
                            <Button variant="outline" className="flex-col h-full">
                                <h3 className="font-bold">Habitación #3</h3>
                                <p>Personas por habitación: 2</p>
                                <p>Tipo de habitación</p>
                            </Button>

                        </TabsContent>
                        <TabsContent value="middle">Change your password here.</TabsContent>
                        <TabsContent value="gold">Change your password here.</TabsContent>
                        <TabsContent value="all">Change your password here.</TabsContent>
                    </div>
                </Tabs>
            </TabsContent>
            <TabsContent value="occupied">Change your password here.</TabsContent>
            <TabsContent value="history_booking">
                <div>
                    <p>filtro 1</p>
                    <p>filtro 2</p>
                    <p>filtro 3</p>
                    <p>filtrar</p>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TabsContent>
        </Tabs>

    </>;
}