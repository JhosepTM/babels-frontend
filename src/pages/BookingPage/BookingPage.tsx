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
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Checkbox } from "@/components/ui/checkbox"
import { BookingRoomDialog } from "./BookingRoomDialog"
import { RoomItem } from "./RoomItem"


export const BookingPage = () => {
    return <>
        {/* <h2>Sistema de Reservas</h2>
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
        </Tabs> */}

        <div className="prueba h-[70vh] w-full flex justify-center">

            {/* <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border m-10"
        style={{boxShadow: "3px 7px 20px 0px rgba(0, 0, 0, 0.25)"}}
        >
            <ResizablePanel defaultSize={15}>
                <div className="flex h-[200px] items-center justify-center p-6">
                <span className="font-semibold">One</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={85} className="shadow-md">
                <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
                    </div>
                </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup> */}
            <ResizablePanelGroup
                direction="vertical"
                className="rounded-lg border m-10"
                style={{ boxShadow: "3px 7px 20px 0px rgba(0, 0, 0, 0.25)" }}
            >
                <ResizablePanel defaultSize={10} minSize={10} maxSize={10}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">One</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={90} minSize={90} maxSize={90}>
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={15} minSize={15} maxSize={15}>
                            <div className="flex flex-col h-[200px] justify-center p-6">
                                <h2 className="mb-2 text-lg font-semibold tracking-tight">Tipo de Habitación </h2>
                                <Button variant="outline" className="mb-2">Simple</Button>
                                <Button variant="outline" className="mb-2">Doble</Button>
                                <Button variant="outline">Matrimonial</Button>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={15} minSize={15} maxSize={15}>
                                    <div className="flex h-full items-center justify-between p-6">
                                        <h1>Habitaciones Simples</h1>
                                        <div className="flex items-center">
                                            <p>Calidad de la Habitación: </p>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Theme" />
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
                                    <div className="h-full p-6 bg-gray-500">
                                        <RoomItem />
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
                                    <div className="flex flex-col h-full items-center justify-between p-6">
                                    <h3 className="mb-2 text-sm font-semibold tracking-tight">Habitaciones Seleccionadas</h3>
                                        <BookingRoomDialog />
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel>
                                    <div className="flex flex-col h-full p-3">
                                        <RoomItem />
                                        <br />
                                        <RoomItem />
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </>;
}