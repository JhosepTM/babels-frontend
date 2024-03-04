import "./App.css";
import { BookingPage } from "./pages/BookingPage/BookingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Menu from "./pages/MenuPage/MenuPage";
import MenuUser from "./pages/MenuPage/MenuUserPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import { FormPage } from "./pages/FormRoomPage/FormPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reservas" element={<BookingPage />} />
        <Route path="/madmin" element={<Menu />} />
        <Route path="/madmin/rooms" element={<RoomsPage />} />
        <Route path="/muser" element={<MenuUser />} />
        <Route path="/madmin/rooms/formrooms" element={<FormPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
