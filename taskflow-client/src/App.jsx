import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
          <Route path="/" />
          <Route path="/features" />
          <Route path="/pricing"/>
          <Route path="/about"/>
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;