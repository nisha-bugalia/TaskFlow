import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import TaskBoard from './components/taskboard';
import LoginModal from './components/LoginModal';
import ContactPage from './components/ContactPage';
import Footer from './Footer';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const location = useLocation();
  const navigate = useNavigate();

  const isModalLogin = location.pathname === '/modal-login';

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-purple-100 text-black'} min-h-screen`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {isModalLogin && <LoginModal isOpen={true} onClose={() => navigate('/')} darkMode={darkMode} />}
      
      <div className="flex">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 p-4 pt-16 ml-64">
          <Routes>
            <Route path="/" element={<TaskBoard darkMode={darkMode} />} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/pricing" element={<div>Pricing Page</div>} />
            <Route path="/contact" element={<><ContactPage darkMode={darkMode} /><Footer darkMode={darkMode} /></>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
