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
        <p className="w-full h-[50px] bg-black"></p>
        <h1 className="text-4xl font-bold m-2 ml-10">Sistema de Reserva</h1>
        <div className="flex items-center ml-10">
                <p className="mr-2">Estado de habitación: </p>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Disponibles" defaultValue="light"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Disponibles</SelectItem>
                        <SelectItem value="dark">Ocupadas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        <div className="prueba h-[80vh] w-full flex justify-center">
            

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
                className="rounded-lg border m-10 mt-2"
                style={{ boxShadow: "3px 7px 20px 0px rgba(0, 0, 0, 0.25)" }}
            >
                <ResizablePanel defaultSize={10} minSize={10} maxSize={10}>
                    <div className="flex h-full items-center justify-center p-6 bg-gray-300">
                        <span className="font-semibold">Habitaciones Disponibles</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={90} minSize={90} maxSize={90}>
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={15} minSize={15} maxSize={15}>
                            <div className="flex flex-col h-[200px] justify-center p-6">
                                <h2 className="mb-2 text-lg font-semibold tracking-tight">Tipo de Habitación </h2>
                                <Button variant="outline" className="mb-2 bg-gray-200">Simple</Button>
                                <Button variant="outline" className="mb-2">Doble</Button>
                                <Button variant="outline">Matrimonial</Button>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={15} minSize={15} maxSize={15}>
                                    <div className="flex h-full items-center justify-between p-6 bg-gray-200">
                                        <h1>Habitaciones Simples</h1>
                                        <div className="flex items-center">
                                            <p className="mr-2">Calidad de la Habitación: </p>
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
                                    <div className="h-full p-6 bg-gray-50">
                                        <RoomItem />
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
                                    <div className="flex flex-col h-full items-center justify-between p-6 bg-gray-100">
                                        <h3 className="mb-2 text-sm font-semibold tracking-tight">Habitaciones Seleccionadas</h3>
                                        <BookingRoomDialog />
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel>
                                    <div className="flex flex-col h-full p-3 bg-gray-100">
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