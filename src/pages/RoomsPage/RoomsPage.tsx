import Header from '@/components/ui/Header';
import "@/assets/images/img1.jpeg";

const RoomsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header showBackButton backRoute="/madmin" showAddRoomButton={true} />

      <div className="flex justify-center items-center mt-8">
        <div className="flex rounded-lg shadow-lg bg-zinc-800 w-96">
          {/* Contenedor de la imagen y texto */}
          <div className="flex">
            {/* Contenedor de la imagen (lado izquierdo) */}
            <div className="flex-shrink-0">
              <img
                src="/src/assets/images/img1.jpeg"
                alt="Imagen 1"
                className="w-48 h-48 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Contenedor del texto (lado derecho) */}
            <div className="p-8">
              <h2 className="text-white font-bold mb-4">Título de la Ficha</h2>
              <p className="text-white mb-4">Descripción de la ficha.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
