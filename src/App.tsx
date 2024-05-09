import "./App.css";
import { GraphicsBar } from "./pages/SideBarPage";
import GraphicsPanel from "./pages/GraphicsPanel";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BarChartPage } from "./pages/ReservationChartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/" element={<Home />} />
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
      </Routes>
    </Router>
  );
}

export default App;
