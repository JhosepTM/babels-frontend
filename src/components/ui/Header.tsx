import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export function Header() {
  const [showAddRoomButton, setShowAddRoomButton] = useState(false);
  const [showStatsButton, setShowStatsButton] = useState(true); // Mostrar el botón de estadísticas por defecto
  const location = useLocation();

  useEffect(() => {
    // Verificar si la ruta actual es RoomsPage
    setShowAddRoomButton(location.pathname === "/madmin/rooms");

    // Verificar si la ruta actual no es MenuUserPage, ocultar el botón de estadísticas
    setShowStatsButton(location.pathname !== "/muser");
  }, [location]);

  return (
    <Menubar className="w-full h-16 flex justify-end py-4">
      <div className="flex">
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg hover:bg-black hover:text-white">
            <Link to="/madmin">Inicio</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg hover:bg-black hover:text-white">
            <Link to="">Reservas</Link>
          </MenubarTrigger>
        </MenubarMenu>
        {showStatsButton && (
          <MenubarMenu>
            <MenubarTrigger className="py-3 px-6 text-lg hover:bg-black hover:text-white">
              <Link to="/madmin/rooms">Editar Habitaciones</Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}
        {showAddRoomButton && (
          <MenubarMenu>
            <MenubarTrigger className="py-3 px-6 text-lg hover:bg-black hover:text-white">
              <Link to="/madmin/rooms/formrooms">Añadir Habitación</Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}
        {showStatsButton && ( // Mostrar el botón de estadísticas solo si showStatsButton es true
          <MenubarMenu>
            <MenubarTrigger className="py-3 px-6 text-lg hover:bg-black hover:text-white">
              <Link to="">Estadísticas</Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg hover:bg-black hover:text-white">
            <MenubarTrigger className="text-lg">
              <Link to="/">Salir</Link>
            </MenubarTrigger>
          </MenubarTrigger>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
