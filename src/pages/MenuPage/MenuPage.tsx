import Header from '@/components/ui/Header';
const OtraPagina = () => {
  return (
    <div>
      <Header />  {/* Aquí se inserta el componente Header */}
      <div className="center-container">
       <div className="flex flex-col items-center justify-center h-screen">
        {/* Imágenes arriba */}
        <div className="mb-4">
          <img src=".\src\assets\images\Estadisticas.svg" alt="Imagen 1" className="w-57 h-37 object-cover" />
        </div>
        <div className="mb-4">
          <img src=".\src\assets\images\Reservas.svg" alt="Imagen 2" className="w-35 h-35 object-cover" />
        </div>

        {/* Imagen abajo */}
        <div>
          <img src=".\src\assets\images\EditAndAddRooms.svg" alt="Imagen 3" className="w-35 h-35 object-cover" />
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default OtraPagina