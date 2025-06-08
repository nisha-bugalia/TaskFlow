import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/task.png";
import { FaUser, FaBars, FaTimes, FaSun, FaMoon, FaBell } from "react-icons/fa";
import { CgMoon, CgSun } from "react-icons/cg";
import { GiMoon } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";

function Navbar({
  darkMode,
  toggleDarkMode,
  menuOpen,
  setMenuOpen,
  navbarMenuRef,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  {
    menuOpen && (
      <div
        className="fixed inset-0 z-[950] bg-black opacity-0 cursor-not-allowed"
        onClick={(e) => e.stopPropagation()}
      ></div>
    );
  }

  return (
    <nav
      className={`sticky  w-[76vw] h-16 rounded-lg b z-10 border-b-[1px] border-gray-300 m-1  transition-colors duration-300 
      ${darkMode ? "bg-gray-800  text-white" : "white"} 
      flex items-center justify-between px-4 text-black`}
    >
      {/* Logo + Title */}
      <div className="flex items-center">
        <h1 className="md:text-2xl text-xl font-bold ml-2">ProFlow</h1>
      </div>

      {/* Desktop Menu */}
      {/* <ul className="hidden md:flex space-x-6">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">About</Link></li>
        <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      </ul> */}

      {/* Right Side Buttons (Desktop Only) */}
      <div className="hidden md:flex items-center gap-2 p-2">
        {/* Search Bar (hidden on small screens) */}
        <div className="hidden md:flex items-center justify-end flex-1 bg-white border-gray-300 border p-2 rounded-lg gap-2">
          <BiSearch className=" text-3xl text-gray-500"></BiSearch>
          <input
            type="text"
            placeholder="Search..."
            className={`w-full max-w-md md:max-w-md bg-inherit font-[300]  focus:outline-none  text-black  hover:selection:outline-none border-0`}
          />
        </div>
        <button
          onClick={toggleDarkMode}
          className="border p-3 border-gray-200 rounded-lg bg-white"
          title="Switch mode"
        >
          {darkMode ? (
            <FaSun className=" text-gray-700"></FaSun>
          ) : (
            <FaMoon className=" text-gray-700"></FaMoon>
          )}
        </button>
        <button
         
          className="border p-3 border-gray-200 rounded-lg bg-white"
          title="Notifications"
        >
        
            <FaBell className=" text-gray-700"></FaBell>
        

      
        </button>
        <button
          onClick={() => navigate("/modal-login")}
          className={`flex items-center gap-2 px-2 py-2 rounded-full transition ml-4
            ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-white text-purple-900 hover:bg-purple-200"
            }`}
        >
          <FaUser className="text-2xl" />
        </button>
      </div>

      {/* Hamburger for Mobile */}
      {/* <button
        className="md:hidden text-xl ml-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button> */}

      {/* Mobile Menu */}
      {/* {menuOpen && (
        <div
        ref={navbarMenuRef}
         className={`  text-white flex flex-col items-center py-4 space-y-4 md:hidden`}>
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
      )} */}
    </nav>
  );
}

export default Navbar;
