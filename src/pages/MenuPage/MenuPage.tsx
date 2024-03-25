import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MenuPage = () => {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: "100vh", overflowY: "hidden" }}
    >
      <Header />
      <div className="flex-grow flex items-center justify-center overflow-hidden mt-8 relative">
        {" "}
        {/* Añadimos la clase relative aquí */}
        <div className="max-w-lg">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="p-14 h-screen">
                  <Card className="border-none rounded-lg h-5/6">
                    <div className="flex flex-col items-center justify-center">
                      <CardTitle className="items-center justify-center p-6">
                        Estadisticas
                      </CardTitle>
                      <CardDescription className="items-center justify-center p-3">
                        La sección de 'Estadísticas' proporciona una visión
                        integral y detallada del rendimiento y la actividad del
                        establecimiento. Aquí, los administradores pueden
                        acceder a datos cruciales sobre reservas, ocupación,
                        ingresos, precios promedio y otros indicadores clave.
                      </CardDescription>
                    </div>
                    <CardContent className="flex aspect-square items-center justify-center p-6 mt-[-30px]">
                      <img
                        src=".\src\assets\images\Estadisticas.svg"
                        alt="Imagen 1"
                        className="w-5/6 h-5/6 mt-[-100px]"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-14 h-screen">
                  <Card className="border-none rounded-lg h-5/6">
                    <div className="flex flex-col items-center justify-center">
                      <CardTitle className="items-center justify-center p-6">
                        Editar Habitaciones
                      </CardTitle>
                      <CardDescription className="items-center justify-center p-3">
                        La función 'Editar Habitación' te brinda el control
                        total sobre la gestión de las habitaciones de tu hotel.
                        Desde esta sección, puedes crear nuevas habitaciones,
                        editar las existentes y eliminar aquellas que ya no son
                        necesarias.
                      </CardDescription>
                    </div>
                    <CardContent className="flex aspect-square items-center justify-center p-6 mt-[-30px]">
                      <img
                        src=".\src\assets\images\EditAndAddRooms.svg"
                        alt="Imagen 2"
                        className="w-5/6 h-5/6 mt-[-100px]" // Ajusta el valor de mt según sea necesario
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-14 h-screen">
                  <Card className="border-none rounded-lg h-5/6">
                    <div className="flex flex-col items-center justify-center">
                      <CardTitle className="items-center justify-center p-6">
                        Reservas
                      </CardTitle>
                      <CardDescription className="items-center justify-center p-3">
                        El sistema 'Reservas' es una herramienta interna
                        exclusiva para el personal de recepción y administración
                        del hotel. Facilita la gestión eficiente de reservas,
                        permitiendo realizar reservas en nombre de los huéspedes
                        de manera rápida y organizada. Con esta plataforma, el
                        personal autorizado puede administrar la disponibilidad,
                        asignar habitaciones y registrar detalles esenciales
                        para garantizar una experiencia de reserva sin
                        contratiempos.
                      </CardDescription>
                    </div>
                    <CardContent className="aspect-square items-center justify-center p-6 mt-[-30px]">
                      <img
                        src=".\src\assets\images\Reservas.svg"
                        alt="Imagen 3"
                        className="w-full h-full mt-[-100px]" // Ajusta el valor de mt según sea necesario
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* Imagen a la izquierda del Carousel */}
          <img
            src=".\src\assets\images\Estadisticas.svg"
            alt="Imagen izquierda"
            className="absolute top-8 left-0 opacity-50 h-1/50 z-0"
          />
          {/* Imagen a la derecha del Carousel */}
          <img
            src=".\src\assets\images\Estadisticas.svg"
            alt="Imagen derecha"
            className="absolute top-8 right-0 opacity-50 h-1/50 z-0"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
