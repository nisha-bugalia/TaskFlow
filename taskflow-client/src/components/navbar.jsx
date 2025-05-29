import React from 'react'
import { Link } from 'react-router-dom';
function navbar() {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TaskFlow</h1>
        <ul className="flex space-x-6">
        <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/features" className="hover:underline">Features</Link></li>
          <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default navbar
