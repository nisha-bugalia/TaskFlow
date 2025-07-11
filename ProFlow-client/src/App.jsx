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
import Step1Role from "./components/Onboarding/Step1Role";
import UploadImage from "./components/UploadImage";
import ProjectDetailPage from "./components/Projects-Management/ProjectDetailPage";
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import SettingsPage from "./components/Settings/SettingsPage";
import NotificationPage from "./components/NotificationPage";
import HomePage from "./Landing_HomePage/HomePage";


function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();


  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
  
    // Apply or remove the `dark` class on <html>
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  
    // (Optional) Save to localStorage for persistence
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  const [projects, setProjects] = useState([]);
  useEffect(() => {
  axios.get("http://localhost:5000/project/get-projects", {
    withCredentials: true,
  })
  .then((res) => {
    setProjects(res.data.projects);
  })
  .catch((error) => console.log(error));
}, []);


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

  const navigate = useNavigate();

  const isAuthRoute = location.pathname === "/login" 
    ||location.pathname === "/signup"
    ||location.pathname === "/verify-pending" 
    || location.pathname==="/verify-email"
    || location.pathname==="/onboarding-flow"
    || location.pathname==="/signupstep1" 
    || location.pathname==="/upload" 
    ||location.pathname==="/";

  const [output, setOutput] = useState("");

  // useEffect(() => {
  //   const loadWasm = async () => {
  //     const Module = await window.TaskSorterModule({
  //       locateFile: (path) => `/wasm/${path}`,
  //     });

  //     const tasks = new Module.TaskList();

  //     const task1 = new Module.Task();
  //     task1.task = "Submit Report";
  //     task1.priority = 9;
  //     task1.deadline = 2;

  //     const task2 = new Module.Task();
  //     task2.task = "Call Client";
  //     task2.priority = 5;
  //     task2.deadline = 1;

  //     const task3 = new Module.Task();
  //     task3.task = "Design UI";
  //     task3.priority = 2;
  //     task3.deadline = 4;

  //     tasks.push_back(task1);
  //     tasks.push_back(task2);
  //     tasks.push_back(task3);

  //     const result = Module.rankTasks(tasks);

  //     let outputText = "";
  //     for (let i = 0; i < result.size(); i++) {
  //       const t = result.get(i);
  //       outputText += `${i + 1}. ${t.task} (P: ${t.priority}, D: ${t.deadline})\n`;
  //     }

  //     setOutput(outputText);
  //   };

  //   // Load JS glue code for WASM
  //   const script = document.createElement("script");
  //   script.src = "/wasm/task_sorter.js";
  //   script.onload = loadWasm;
  //   document.body.appendChild(script);
  // }, []);

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

{/* 
       <h2>🧠 Task Sorter using C++ + WebAssembly + React</h2>
      <pre>{output}</pre>  */}

      <Toaster position="top-center" reverseOrder={false}  />
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
              toggleDarkMode={toggleDarkMode}
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
                path="/profile"
                element={
                  <ProfilePage/>
                }
                />
                <Route 
                path="/settings"
                element={
                  <SettingsPage/>
                }
                />
                <Route 
                path="/notifications" 
                element={<NotificationPage/>}/>

                <Route
                  path="/projects"
                  element={
                    <MainProjectsPage projects={projects} setProjects={setProjects}/>
                  }
                />
                <Route path="/project" element={<ProjectDetailPage key={location.key}/> } />
              </Routes>
            </main>
          </div>
        </div>
      )}

      {/* If login/signup page, show only those */}
      {isAuthRoute && (
        <>
        <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>}/>
        <Route path="/login" element={<LoginModal />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/upload" element={<UploadImage />} />
        
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
