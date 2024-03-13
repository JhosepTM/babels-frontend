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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
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
        {isAuthenticated && isAdmin && (
          <>
            <Route path="/madmin" element={<Menu />} />
            <Route path="/madmin/rooms" element={<RoomsPage />} />
            <Route path="/madmin/rooms/formrooms" element={<FormPage />} />
          </>
        )}
        {isAuthenticated && !isAdmin && (
          <Route path="/muser" element={<MenuUser />} />
        )}
        {!isAuthenticated && <Route path="/" element={<LoginPage />} />}
        <Route path="/reservas" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
