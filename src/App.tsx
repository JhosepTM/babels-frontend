import './App.css';
import { BookingPage } from './pages/BookingPage/BookingPage';
import Home from './pages/Home';
import Menu from './pages/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reservas" element={<BookingPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
