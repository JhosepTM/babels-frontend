import Header from '@/components/ui/Header';

const MenuUserPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <div className="center-container flex flex-col items-center justify-center h-full">
          {/* Imágenes arriba */}
          <div className="mb-4 flex items-center">
            <div className="ml-4 text-center menu-item hover:scale-105" style={{ marginBottom: '50px' }}>
              <a href="/ruta-de-reservas">
                <img src=".\src\assets\images\Reservas.svg" alt="Imagen 2" style={{ width: '300px', height: '150px', objectFit: 'cover' }} />
                <p className="text-white font-bold mt-1">Reservar Habitaciones</p>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuUserPage;