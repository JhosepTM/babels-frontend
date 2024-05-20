import { Header } from "@/components/Header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
      <div className="flex-grow flex items-center justify-center overflow-hidden mt-8 relative w-full">
        <div className="max-w-screen-lg w-full">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="p-14 h-screen flex items-center justify-between">
                  <div className="w-1/2">
                    <Card className="border-none rounded-lg h-5/6 w-full">
                      <div className="flex flex-col items-start justify-center h-full p-6">
                        <CardTitle className="text-3xl mb-4">
                          Estadísticas
                        </CardTitle>
                        <CardDescription className="text-lg mb-8">
                          La sección de 'Estadísticas' proporciona una visión
                          integral y detallada del rendimiento y la actividad
                          del establecimiento. Aquí, los administradores pueden
                          acceder a datos cruciales sobre reservas, ocupación,
                          ingresos, precios promedio y otros indicadores clave.
                        </CardDescription>
                      </div>
                    </Card>
                  </div>
                  <div className="w-1/2 flex justify-center items-center">
                    <img
                      src="./src/assets/images/Estadisticas.svg"
                      alt="Imagen 1"
                      className="w-3/4"
                    />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-14 h-screen flex items-center justify-between">
                  <div className="w-1/2">
                    <Card className="border-none rounded-lg h-5/6 w-full">
                      <div className="flex flex-col items-start justify-center h-full p-6">
                        <CardTitle className="text-3xl mb-4">
                         Habitaciones
                        </CardTitle>
                        <CardDescription className="text-lg mb-8">
                          La función 'Editar Habitación' te brinda el control
                          total sobre la gestión de las habitaciones de tu
                          hotel. Desde esta sección, puedes crear nuevas
                          habitaciones, editar las existentes y eliminar
                          aquellas que ya no son necesarias.
                        </CardDescription>
                      </div>
                    </Card>
                  </div>
                  <div className="w-1/2 flex justify-center items-center">
                    <img
                      src="./src/assets/images/EditAndAddRooms.svg"
                      alt="Imagen 2"
                      className="w-3/4"
                    />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-14 h-screen flex items-center justify-between">
                  <div className="w-1/2">
                    <Card className="border-none rounded-lg h-5/6 w-full">
                      <div className="flex flex-col items-start justify-center h-full p-6">
                        <CardTitle className="text-3xl mb-4">
                          Reservas
                        </CardTitle>
                        <CardDescription className="text-lg mb-8">
                          El sistema 'Reservas' es una herramienta interna
                          exclusiva para el personal de recepción y
                          administración del hotel. Facilita la gestión
                          eficiente de reservas, permitiendo realizar reservas
                          en nombre de los huéspedes de manera rápida y
                          organizada. Con esta plataforma, el personal
                          autorizado puede administrar la disponibilidad,
                          asignar habitaciones y registrar detalles esenciales
                          para garantizar una experiencia de reserva sin
                          contratiempos.
                        </CardDescription>
                      </div>
                    </Card>
                  </div>
                  <div className="w-1/2 flex justify-center items-center">
                    <img
                      src="./src/assets/images/Reservas.svg"
                      alt="Imagen 3"
                      className="w-full"
                    />
                  </div>
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
