import "./App.css";
import { BookingPage } from "./pages/BookingPage/BookingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Menu from "./pages/MenuPage/MenuPage";
import MenuUser from "./pages/MenuPage/MenuUserPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import { FormPage } from "./pages/FormRoomPage/FormPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthToken } from "./services/Login/tokenService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./entities/customJwtPayload";
import ErrorPage from "./pages/utils/ErrorPage";
import AddRoomPage from "./pages/FormRoomPage/AddRoomPage";
import PageWithButton from "./pages/FormRoomPage/PageWithButton";
import EditRoomPage from "./pages/FormRoomPage/EditRoomPage";
import { BarChartPage } from "./pages/ReservationChartPage";
import { GraphicsBar } from "./pages/SideBarPage";
import GraphicsPanel from "./pages/GraphicsPanel";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let token = getAuthToken();
    if (token !== null) {
      setIsAuthenticated(true);
      const decoded = jwtDecode<CustomJwtPayload>(token);
      console.log(decoded);
      if (decoded.role === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/jodem" element={<GraphicsPanel />} />
        <Route
          path="/bookings"
          element={<GraphicsBar itemActive="bookings" />}
        />
        <Route path="/revenue" element={<GraphicsBar itemActive="revenue" />} />
        <Route path="/occ" element={<GraphicsBar itemActive="occ" />} />
        <Route path="/adr" element={<GraphicsBar itemActive="adr" />} />
        <Route path="/revpar" element={<GraphicsBar itemActive="revpar" />} />
        <Route path="/bar" element={<BarChartPage />} />
        {isAuthenticated && isAdmin ? (
          <>
            <Route path="/madmin" element={<Menu />} />
            <Route path="/madmin/rooms" element={<RoomsPage />} />
            <Route path="/madmin/rooms/addroom" element={<AddRoomPage />} />
            <Route path="/madmin/rooms/editroom" element={<EditRoomPage />} />
          </>
        ) : null}
        {isAuthenticated && !isAdmin ? (
          <Route path="/muser" element={<MenuUser />} />
        ) : null}

        {!isAuthenticated ? (
          <Route path="/login" element={<LoginPage />} />
        ) : (
          <Route path="*" element={<ErrorPage />} />
        )}
        <Route path="/reservas" element={<BookingPage />} />
        <Route path="/room" element={<FormPage />} />
        <Route path="/boton" element={<PageWithButton />} />
      </Routes>
    </Router>
  );
}

export default App;
