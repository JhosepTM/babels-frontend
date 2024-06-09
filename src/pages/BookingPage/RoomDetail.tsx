import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PersonalDataDialog } from "./PersonalDataDialog"
import { RoomModel } from "@/modules/booking/models/room"

export interface RoomDetailProps {
    room: RoomModel
}
export const RoomDetail = ({room}: RoomDetailProps) => {
    const length = 5;
    let i = 0;
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="" variant={"secondary"}>
                        Ver detalle
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[825px] bg-gray-100">
                    <DialogHeader>
                        <DialogTitle>Detalle de la habitación</DialogTitle>
                        <DialogDescription className="flex flex-row justify-between">
                            <div className="flex flex-col h-full w-[15%] justify-center">
                                <div className="p-[15%] bg-white border border-gray-500 rounded w-[250%]">
                                    <PersonalDataDialog label="Nombre habitación:" value={`${room.nameRoom}`} />
                                    <PersonalDataDialog label="Descripción:" value={`${room.description}`} />
                                    <PersonalDataDialog label="Tipo habitación:" value={`${room.roomType}`} />
                                        <PersonalDataDialog label="Cant. personas:" value={`1`} />
                                    <div className="space-y-1 flex justify-between">
                                        <PersonalDataDialog label="Precio por noche:" value={`${room.price} Bs.`} />
                                    </div>
                                </div>
                            </div>
                            <div className="m-8 p-4 h-max">
                                <h2 className="text-xl my-4 text-black">Imagenes de referencia</h2>
                                <Carousel className="w-full max-w-xs">
                                    <CarouselContent>
                                        {Array.from({ length: length }).map((_, index) => {
                                            i = index;
                                            return (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                                            <img src="https://www.hotelvinasqueirolo.com/blog/wp-content/uploads/2020/09/DESTACADA-7-1066x546.jpg"></img>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        )})}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}