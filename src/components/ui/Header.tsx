import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function Header() {
  const [showAddRoomButton, setShowAddRoomButton] = useState(false);
  const location = useLocation();

  // Verificar si la ruta actual es RoomsPage
  useEffect(() => {
    setShowAddRoomButton(location.pathname === "/madmin/rooms");
  }, [location]);

  return (
    <Menubar className="w-full h-16 flex justify-end py-4">
      <div className="flex">
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg">
            <Link to="/madmin">Inicio</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg">Reservas</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg">
            <Link to="/madmin/rooms">Editar Habitaciones</Link>
          </MenubarTrigger>
        </MenubarMenu>
        {showAddRoomButton && (
          <MenubarMenu>
            <MenubarTrigger className="py-3 px-6 text-lg">
              <Link to="/madmin/rooms/formrooms">Añadir Habitación</Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg">Estadisticas</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="py-3 px-6 text-lg">
            <FontAwesomeIcon icon={faBars} />
          </MenubarTrigger>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}

