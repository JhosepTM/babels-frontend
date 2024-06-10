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
import { SideBar } from "./pages/SideBarPage";
import GraphicsPanel from "./pages/GraphicsPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Toaster theme="light" />
      <Router>
        <Routes>
          <Route path="/charts" element={<GraphicsPanel />} />
          <Route path="/bookings" element={<SideBar itemActive="bookings" />} />
          <Route path="/revenue" element={<SideBar itemActive="revenue" />} />
          <Route path="/occ" element={<SideBar itemActive="occ" />} />
          <Route path="/adr" element={<SideBar itemActive="adr" />} />
          <Route
            path="/revpar-trevpar"
            element={<SideBar itemActive="revpar-trevpar" />}
          />
          <Route path="/goppar" element={<SideBar itemActive="goppar" />} />
          <Route path="/bar" element={<SideBar itemActive="bar" />} />
          <Route
            path="/revenueAll"
            element={<SideBar itemActive="revenueAll" />}
          />
          <Route
            path="/expenseAll"
            element={<SideBar itemActive="expenseAll" />}
          />
          <Route path="/report" element={<SideBar itemActive="report" />} />
          {isAuthenticated && isAdmin ? (
            <>
              <Route path="/madmin" element={<Menu />} />
              <Route path="/madmin/reservas" element={<BookingPage />} />
              <Route path="/madmin/rooms" element={<RoomsPage />} />
              <Route path="/madmin/rooms/addroom" element={<AddRoomPage />} />
              <Route path="/madmin/rooms/editroom" element={<EditRoomPage />} />
            </>
          ) : null}
          {isAuthenticated && !isAdmin ? (
            <Route path="/muser" element={<MenuUser />} />
          ) : null}

        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
            {/* Redirect to error page if a non-authenticated user tries to access restricted routes */}
            <Route path="/madmin/*" element={<ErrorPage />} />
            <Route path="/muser/*" element={<ErrorPage />} />
          </>
        ) : (
          <Route path="*" element={<ErrorPage />} />
        )}
        
        <Route path="/room" element={<FormPage />} />
        <Route path="/boton" element={<PageWithButton />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
