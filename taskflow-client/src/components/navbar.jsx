import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/task.png';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode, menuOpen, setMenuOpen, navbarMenuRef }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen])

  {(menuOpen) && (
    <div
      className="fixed inset-0 z-[950] bg-black opacity-0 cursor-not-allowed"
      onClick={(e) => e.stopPropagation()}
    ></div>
  )}

  return (
    <nav className={`fixed w-full h-16 rounded-lg border-2 z-[1000] transition-colors duration-300 
      ${darkMode ? 'bg-gray-800 border-purple-600 text-white' : 'bg-purple-800 border-purple-900 text-white'} 
      flex items-center justify-between px-4`}>
      
      {/* Logo + Title */}
      <div className="flex items-center">
        <img src={logo} alt="TaskFlow Logo" className="h-10 w-12 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-bold ml-2">TaskFlow</h1>
      </div>

      {/* Search Bar (hidden on small screens) */}
      <div className="hidden md:flex items-center justify-end flex-1 mr-4">
        <input
          type="text"
          placeholder="Search..."
          className={`w-full max-w-md md:max-w-md px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-400 text-black 
            ${darkMode ? 'bg-slate-200' : 'bg-white'}`}
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">About</Link></li>
        <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      </ul>

      {/* Right Side Buttons (Desktop Only) */}
      <div className="hidden md:flex items-center ml-3 space-x-2">
        <button
          onClick={toggleDarkMode}
          className="border-2 py-1 px-2 border-purple-600 rounded-md text-white hover:text-gray-300"
          title="Switch mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          onClick={() => navigate('/modal-login')}
          className={`flex items-center gap-2 px-2 py-2 rounded transition
            ${darkMode
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
            }`}
        >
          <FaUser className="text-lg" />
        </button>
      </div>

      {/* Hamburger for Mobile */}
      <button
        className="md:hidden text-xl ml-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
        ref={navbarMenuRef}
         className={`absolute top-16 left-0 w-full bg-purple-900 text-white flex flex-col items-center py-4 space-y-4 md:hidden z-[9999]`}>
          <input
            type="text"
            placeholder="Search..."
            className={`w-11/12 px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-400 text-black 
              ${darkMode ? 'bg-slate-200' : 'bg-white'}`}
          />
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <div className="flex gap-4">
            <button
              onClick={toggleDarkMode}
              className="border-2 py-1 px-2 border-purple-300 rounded-md"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate('/modal-login');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded 
                ${darkMode ? 'bg-white text-black' : 'bg-purple-100 text-purple-900'}`}
            >
              <FaUser />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
