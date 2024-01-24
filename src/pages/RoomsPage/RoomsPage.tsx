import Header from '@/components/ui/Header';

const RoomsPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <Header showBackButton backRoute="/madmin" showAddRoomButton={true} />
      <div className="flex justify-center items-center mt-8">
        <div className="flex rounded-lg shadow-lg bg-zinc-800 w-2/4 max-h-72 overflow-hidden">
          {/* Contenedor de la imagen y texto */}
          <div className="flex">
            {/* Contenedor de la imagen (lado izquierdo) */}
            <div className="flex-shrink-0 w-2/5 h-auto max-h-72">
              <img
                src="/src/assets/images/img1.jpeg"
                alt="Imagen 1"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Contenedor del texto (lado derecho) */}
            <div className="p-8">
              <h2 className="text-white font-bold mb-4">Cuarto del Amor</h2>
              <p className="text-white mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec massa euismod, accumsan velit vitae, sagittis nibh. Pellentesque aliquam nisl massa, ut lobortis tortor egestas a. Donec laoreet risus a nisl efficitur, a porta ligula egestas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
