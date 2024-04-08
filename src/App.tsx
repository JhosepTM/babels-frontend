import "./App.css";
import { GraphicsBar } from "./pages/GraphicsBar";
import GraphicsPanel from "./pages/GraphicsPanel";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BarChartPage } from "./pages/BarChartPage";

import { TableReservation } from "./components/table/TableReservation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/" element={<Home />} />
        <Route path="/jodem" element={<GraphicsPanel />} />
        <Route path="/graphics/bar" element={<GraphicsBar />} />
        <Route path="/bar" element={<BarChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
