import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MenuPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-lg">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        src=".\src\assets\images\Estadisticas.svg"
                        alt="Imagen 1"
                        className="w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        src=".\src\assets\images\EditAndAddRooms.svg"
                        alt="Imagen 2"
                        className="w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <Card>
                    <CardContent className="aspect-square items-center justify-center p-6">
                      <img
                        src=".\src\assets\images\Reservas.svg"
                        alt="Imagen 2"
                        className="w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
