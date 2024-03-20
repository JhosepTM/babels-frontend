import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { AlertDialogSesion } from "@/components/AlertDialogSesion";
import { Label } from "@/components/ui/label";
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

  const getHeaderText = () => {
    switch (location.pathname) {
      case "/madmin":
        return "Pagina Principal";
      case "/madmin/rooms":
        return "Editar Habitaciones";
      case "/madmin/rooms/formrooms":
        return "Añadir Habitación";
      default:
        return "Pagina Principal";
    }
  };

  return (
    <div className="lg:relative">
      <div className="shadow-lg">
        {" "}
        {/* Agrega sombreado al menú */}
        <Menubar className="w-full lg:w-auto h-16 flex lg:flex-wrap lg:justify-end py-1">
          <div className="flex items-center lg:items-start lg:flex-col lg:py-5 lg:px-2 lg:absolute lg:inset-y-0 lg:left-4">
            <Label className="text-xl">{getHeaderText()}</Label>
          </div>
          {/* Renderiza el botón de inicio solo si no se encuentra en la página de usuario */}
          {location.pathname !== "/muser" && (
            <MenubarMenu>
              <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                <Link to="/madmin">
                  <FaHome />
                </Link>
                <Link to="/madmin">Inicio</Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
          <MenubarMenu>
            <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
              <Link to="/madmin/reservas">
                <FaBook />
              </Link>
              <Link to="/madmin/reservas">Reservas</Link>
            </MenubarTrigger>
          </MenubarMenu>
          {showStatsButton && (
            <MenubarMenu>
              <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                <Link to="/madmin/rooms">
                  <FaEdit />
                </Link>
                <Link to="/madmin/rooms">Editar Habitaciones</Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
          {showAddRoomButton && (
            <MenubarMenu>
              <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                <Link to="/madmin/rooms/addroom">
                  <FaPlus />
                </Link>
                <Link to="/madmin/rooms/addroom">Añadir Habitación</Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
          {showStatsButton && (
            <MenubarMenu>
              <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
                <Link to="">
                  <FaChartBar />
                </Link>
                <Link to="">Estadísticas</Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
          <MenubarMenu>
            <MenubarTrigger className="py-3 px-6 text-lg hover:bg-gray-900 hover:text-white">
              <Link to="">
                <FaSignOutAlt />
              </Link>
              <AlertDialogSesion />
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}
