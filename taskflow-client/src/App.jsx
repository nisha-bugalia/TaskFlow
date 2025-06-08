import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import TaskBoard from "./components/taskboard";
import LoginModal from "./components/LoginModal";
import ContactPage from "./components/ContactPage";
import Footer from "./Footer";

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // From TaskBoard
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle

  const sidebarRef = useRef(null);
  const navbarMenuRef = useRef(null);
  const taskModalOpenRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check sidebar
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }

      if (
        isModalOpen &&
        taskModalOpenRef.current &&
        !taskModalOpenRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }

      // Check navbar menu
      if (
        menuOpen &&
        navbarMenuRef.current &&
        !navbarMenuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, menuOpen, isModalOpen]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const location = useLocation();
  const navigate = useNavigate();
  const isLoginModalOpen = location.pathname === "/modal-login";

  const shouldHideSidebarButton = isLoginModalOpen || isModalOpen; // 🔸 Hide if any modal is open

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen font-inter flex w-[100vw]  `}
    >
      {/* {isLoginModalOpen && (
        <LoginModal
          isOpen={true}
          onClose={() => navigate('/')}
          darkMode={darkMode}
        />
      )} */}

      {/* Sidebar toggle button - show only if no modals */}
      {/* {!shouldHideSidebarButton && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-1/2 ${isSidebarOpen ? 'left-60 z-[951]' : 'left-0 z-2'} transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 md:hidden
          ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      )} */}

      {/* {(isSidebarOpen || menuOpen) && (
        <div
          className="fixed inset-0 z-[90] bg-black opacity-0 cursor-not-allowed"
          onClick={(e) => e.stopPropagation()}
        ></div>
      )} */}

      <div>
      <Sidebar
        darkMode={darkMode}
        isOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
      />
      </div>
      <div className=" flex flex-col items-stretch">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navbarMenuRef={navbarMenuRef}
      />
       <div>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <TaskBoard
                  darkMode={darkMode}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  taskModalOpenRef={taskModalOpenRef}
                />
              }
            />
            {/* <Route path="/about" element={<div>About Page</div>} />
            <Route path="/pricing" element={<div>Pricing Page</div>} />
            <Route path="/contact" element={<><ContactPage darkMode={darkMode} /><Footer darkMode={darkMode} /></>} /> */}
          </Routes>
        </div>
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
