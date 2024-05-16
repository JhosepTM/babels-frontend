import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { AlertDialogSesion } from "@/components/AlertDialogSesion";
import {
  FaHome,
  FaBook,
  FaEdit,
  FaPlus,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

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
    <div className="lg:relative">
      <div className="shadow-lg">
        {" "}
        {/* Agrega sombreado al menú */}
        <Menubar className="w-full lg:w-auto h-16 flex lg:flex-wrap lg:justify-end py-1">
          <div className="flex items-center lg:items-start lg:flex-col lg:py-5 lg:px-2 lg:absolute lg:inset-y-0 lg:left-4">
          </div>
          {/* Renderiza el botón de inicio solo si no se encuentra en la página de usuario */}
          {location.pathname !== "/muser" && (
            <MenubarMenu>
              <Link to="/madmin">
                <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                  <FaHome />
                  Inicio
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          )}
          {location.pathname !== "/muser" && (
            <MenubarMenu>
              <Link to="/madmin/reservas">
                <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                  <FaBook />
                  Reservas
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          )}
          {showStatsButton && (
            <MenubarMenu>
              <Link to="/madmin/rooms">
                <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                  <FaEdit />
                  Habitaciones
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          )}
          {showAddRoomButton && (
            <MenubarMenu>
              <Link to="/madmin/rooms/addroom">
                <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                  <FaPlus className="mr-2" />
                  Añadir Habitación
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          )}
          {showStatsButton && (
            <MenubarMenu>
              <Link to="" >
                <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                  <FaChartBar className="mr-2" />
                  Estadísticas
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          )}
          <MenubarMenu>
              <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                <FaSignOutAlt className="mr-2" />
                <AlertDialogSesion/>
              </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}
