import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PersonalDataDialog } from "./PersonalDataDialog"

export const RoomDetail = () => {
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
                            <div className="flex flex-col">
                                <h2 className="text-xl my-4 text-black">Habitacion #3</h2>
                                <div className="flex-grow p-[5%] bg-white border border-gray-500 rounded">
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                    <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                    <div className="space-y-1 flex justify-between">
                                        <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
                                        <PersonalDataDialog label="Nombre:" value="Jhosep jesus orlando" />
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
                                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        )})}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                                <p className="text-center mt-10">{i+1} de {length}</p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}