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
import TaskBoard from "./components/dashboard/taskboard";
import LoginModal from "./components/LoginModal";
import ContactPage from "./components/ContactPage";
import Footer from "./Footer";
import SignupForm from "./components/SignupForm";
import VerifyPendingPage from "./components/VerifyPendingPage";
import EmailVerifyPage from "./components/EmailVerifyPage";
import MainProjectsPage from "./components/MainProjectsPage";
import OnboardingFlow from "./components/OnboardingFlow";
import ProjectDetailPage from "./components/Projects-Management/ProjectDetailPage";
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
    id: 1,
    title: "Portfolio Website",
    startDate: "2025-06-08T19:00:00.000Z",
    dueDate: "2025-06-11T00:00:00.000Z",
    priority: "High",
    description: "Design and build a personal portfolio using React and Tailwind CSS.",
    tag: "Frontend",
    status: "Done",
    progress: 70,
    completedTasks: 7,
    totalTasks: 10,
    },
    {
    id: 2,
    title: "E-commerce Backend",
    startDate: "2025-06-08T19:00:00.000Z",
    dueDate: "2025-06-11T00:00:00.000Z",
    priority: "Low",
    description: "Develop RESTful APIs for product, cart, and user modules.",
    tag: "Backend",
    status: "In Progress",
    progress: 40,
    completedTasks: 4,
    totalTasks: 10,
    },
]);

const handleAddProject=(newProject)=>{
  const projectWithId={
    ...newProject,
    id:Date.now(),
    progress:0,
    completedTasks:0,
    totalTasks:0,
  }
  setProjects((prev)=>[...prev, projectWithId]);
  setShowAddTaskModal(false);

}


  const sidebarRef = useRef(null);
  const navbarMenuRef = useRef(null);
  const taskModalOpenRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isAuthRoute = location.pathname === "/login" 
   ||location.pathname === "/signup"
   ||location.pathname === "/verify-pending" 
   || location.pathname==="/verify-email"
   || location.pathname==="/onboarding-flow";

  useEffect(() => {
    function handleClickOutside(event) {
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

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen font-inter w-full`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {/* If NOT login/signup page, show sidebar + navbar */}
      {!isAuthRoute && (
        <div className="flex">
          <Sidebar
            darkMode={darkMode}
            isOpen={isSidebarOpen}
            sidebarRef={sidebarRef}
          />
          <div className="flex flex-col w-full">
            <Navbar
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              navbarMenuRef={navbarMenuRef}
            />
            <main className="p-4">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <TaskBoard
                      darkMode={darkMode}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      taskModalOpenRef={taskModalOpenRef}
                    />
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <MainProjectsPage projects={projects} setProjects={setProjects}/>
                  }
                />
                <Route path="projects/:id" element={<ProjectDetailPage projects={projects} setProjects={setProjects}/> } />
              </Routes>
            </main>
          </div>
        </div>
      )}

      {/* If login/signup page, show only those */}
      {isAuthRoute && (
        <>
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-pending" element={<VerifyPendingPage />} />
        <Route path="/verify-email" element={<EmailVerifyPage />} />
        <Route path="/onboarding-flow" element={<OnboardingFlow/>}/>
        </Routes>
        </>

      )}
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
