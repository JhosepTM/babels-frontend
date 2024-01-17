import './App.css';
import { BookingPage } from './pages/BookingPage/BookingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Menu from './pages/LoginPage/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reservas" element={<BookingPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
