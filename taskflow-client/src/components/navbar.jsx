import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/task.png'  // adjust the path as needed

function Navbar() {
  return (
      <nav className="fixed m-1 mx-auto w-full h-16 rounded-xl border-purple-900 border-2 bg-purple-800 text-white flex items-center justify-between px-4">
          <div className="flex items-center ">
            <img 
              src={logo} 
              alt="TaskFlow Logo" 
              className="h-15 w-20 rounded-full" 
            />
            <h1 className="text-3xl font-bold">TaskFlow</h1>
            
          </div>
          <div className="flex items-center justify-end flex-1 mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-400 text-black"
            />
          </div>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
      </nav>
  )
}

export default Navbar
