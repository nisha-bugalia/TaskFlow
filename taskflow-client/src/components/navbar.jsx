import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/task.png'  // adjust the path as needed

function Navbar() {
  return (
      <nav className="fixed mx-auto w-full h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-between px-4">
          <div className="flex items-center ">
            <img 
              src={logo} 
              alt="TaskFlow Logo" 
              className="h-15 w-20 rounded-full" 
            />
            <h1 className="text-3xl font-bold">TaskFlow</h1>
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
