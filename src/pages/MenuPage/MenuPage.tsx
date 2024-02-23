import {Header} from '@/components/ui/Header';



const MenuPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <div className="center-container flex flex-col items-center justify-center h-full">
          {/* Imágenes arriba */}
          <div className="mb-4 flex items-center">
            <div className="mr-4 text-center menu-item hover:scale-105" style={{ marginBottom: '50px' }}>
              <a href="/ruta-de-estadisticas">
                <img src=".\src\assets\images\Estadisticas.svg" alt="Imagen 1" style={{ width: '200px', height: '170px' }} />
                <p className="text-white font-bold mt-1">Estadisticas y Estudios</p>
              </a>
            </div>
            <div className="ml-4 text-center menu-item hover:scale-105" style={{ marginBottom: '50px' }}>
              <a href="/ruta-de-reservas">
                <img src=".\src\assets\images\Reservas.svg" alt="Imagen 2" style={{ width: '300px', height: '165px', objectFit: 'cover' }} />
                <p className="text-white font-bold mt-1">Reservar Habitaciones</p>
              </a>
            </div>
          </div>

          {/* Imagen abajo */}
          <div className="items-center text-center menu-item hover:scale-105" style={{ marginBottom: '50px' }}>
            <a href="/madmin/rooms">
              <img src=".\src\assets\images\EditAndAddRooms.svg" alt="Imagen 3" style={{ width: '250px', height: '170px', objectFit: 'cover' }} />
              <p className="text-white font-bold mt-1">Administrar Habitaciones</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;