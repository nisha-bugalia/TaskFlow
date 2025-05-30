import React from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import TaskBoard from './components/taskboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-purple-100 min-h-screen text-white">
      <BrowserRouter>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4 pt-16 ml-64">
            <TaskBoard />
            <Routes>
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
