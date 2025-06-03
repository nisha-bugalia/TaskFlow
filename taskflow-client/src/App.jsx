import React, { useState } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import TaskBoard from './components/taskboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-purple-100 text-white'} min-h-screen`}>
      <BrowserRouter>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex">
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          <div className="flex-1 p-4 pt-16 ml-64">
            <Routes>
              <Route path="/" element={<TaskBoard darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
              <Route path="/features" element={<div>Features Page</div>} />
              <Route path="/pricing" element={<div>Pricing Page</div>} />
              <Route path="/about" element={<div>About Page</div>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
