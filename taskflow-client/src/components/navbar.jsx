import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/task.png';  // adjust path
import { FaUser } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  return (
    <nav className={`fixed m-1 mx-auto w-full h-16 rounded-xl border-2 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-purple-600 text-white' : 'bg-purple-800 border-purple-900 text-white'} flex items-center justify-between px-4`}>
      <div className="flex items-center">
        <img src={logo} alt="TaskFlow Logo" className="h-15 w-20 rounded-full" />
        <h1 className="text-3xl font-bold">TaskFlow</h1>
      </div>
      <div className="flex items-center justify-end flex-1 mr-4">
        <input
          type="text"
          placeholder="Search..."
          className={`w-full max-w-md px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-400 text-black ${darkMode ? 'bg-slate-200' : 'bg-white'}`}
        />
      </div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">About</Link></li>
        <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      </ul>
      <button
        onClick={toggleDarkMode}
        className="flex gap-2 border-2 py-1 px-1 border-purple-600 rounded-md ml-3 text-white hover:text-gray-300"
        title="Switch mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <button
        onClick={() => navigate('/modal-login')}
        className={`flex items-center ml-2 gap-2 px-2 py-2 rounded transition
          ${darkMode
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
          }`}
      >
        <FaUser className="text-lg" />
      </button>
    </nav>
  );
}

export default Navbar;
