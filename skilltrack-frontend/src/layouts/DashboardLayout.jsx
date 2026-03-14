import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaFire,
  FaCheckCircle,
  FaUser,
  FaBars,
  FaChevronDown,
  FaBook,
  FaLightbulb,
  FaPlus,
  FaMoon,
  FaSun
} from "react-icons/fa";

import { useState, useEffect } from "react";
import Codeverge_Logo from "../assets/codeverge-transperant_Logo-removebg-preview.png"


const DashboardLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  const employeeName = localStorage.getItem("employeeName") || "Guest";

  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {

    navigate(path);

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }

  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/employeeDashboard" },
    { name: "My Skills", icon: <FaLightbulb />, path: "/myskills" },
    { name: "Add New Skill", icon: <FaPlus />, path: "/addSkill" },
    { name: "Progress Tracker", icon: <FaChartLine />, path: "/progress" },
    { name: "Consistency", icon: <FaFire />, path: "/consistency" },
    { name: "Skill Analytics", icon: <FaChartLine />, path: "/analytics" }
  ];

  const roadmapItems = [
    { name: "Frontend Roadmap", path: "/roadmap/frontend" },
    { name: "Backend Roadmap", path: "/roadmap/backend" },
    { name: "DevOps Roadmap", path: "/roadmap/devops" }
  ];

  return (

    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

      {/* Sidebar */}

      <div
        className={`fixed top-0 left-0 h-full
        ${sidebarOpen ? "w-64" : "w-20"}
        bg-[#086070] dark:bg-gray-900
        shadow-lg
        transition-all duration-300 z-40`}
      >

        <div className="p-4">

          {/* Logo */}

         <div className="flex flex-col items-center mb-6">

  {/* Logo */}

  <img
    src={Codeverge_Logo}
    alt="Codeverge"
    className={`${sidebarOpen ? "w-35" : "w-20"} transition-all text-gray-200`}
  />

  {/* Company Name */}

  {/* {sidebarOpen && (
    <p className="text-gray-200 text-sm font-semibold mt-1">
      CODEVERGE
    </p>
  )} */}

  {/* App Name */}

  {sidebarOpen && (
    <h2 className="text-white text-2xl font-bold mt-1">
      SkillTrack
    </h2>
  )}

</div>
          {/* Profile */}

          <div className={`flex items-center mb-6
            ${sidebarOpen ? "gap-3" : "justify-center"}
          `}>

            <FaUser className="text-white text-2xl" />

            {sidebarOpen && (
              <div>
                <p className="text-gray-300 text-sm">Welcome,</p>
                <p className="text-white font-semibold">{employeeName}</p>
                <p className="text-gray-400 text-xs">Employee</p>
              </div>
            )}

          </div>

          <hr className="border-gray-400 mb-4" />

          {/* Menu */}

          <nav className="flex flex-col gap-2">

            {menuItems.map((item, index) => (

              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center
                ${sidebarOpen ? "gap-3 px-4" : "justify-center"}
                py-2 rounded transition

                ${isActive(item.path)
                  ? "bg-white text-[#086070] font-semibold"
                  : "text-white hover:bg-blue-50 hover:text-blue-600"}
                `}
              >

                {item.icon}

                {sidebarOpen && <span>{item.name}</span>}

              </button>

            ))}

            {/* Learning Roadmap */}

            <button
              onClick={() => setRoadmapOpen(!roadmapOpen)}
              className={`flex items-center
              ${sidebarOpen ? "justify-between px-4" : "justify-center"}
              py-2 text-white hover:bg-blue-50 hover:text-blue-600 rounded`}
            >

              <span className={`flex items-center gap-2 ${!sidebarOpen && "justify-center"}`}>

                <FaBook />

                {sidebarOpen && "Learning Roadmap"}

              </span>

              {sidebarOpen && (
                <FaChevronDown
                  className={`${roadmapOpen ? "rotate-180" : ""} transition`}
                />
              )}

            </button>

            {roadmapOpen && sidebarOpen && (

              <div className="ml-6 flex flex-col gap-2">

                {roadmapItems.map((item, index) => (

                  <button
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className={`text-left px-3 py-2 rounded transition
                    ${isActive(item.path)
                      ? "bg-white text-[#086070]"
                      : "text-gray-200 hover:bg-blue-50 hover:text-blue-600"}
                    `}
                  >
                    {item.name}
                  </button>

                ))}

              </div>

            )}

            {/* Completed */}

            <button
              onClick={() => handleNavigation("/completed")}
              className={`flex items-center
              ${sidebarOpen ? "gap-3 px-4" : "justify-center"}
              py-2 rounded transition
              ${isActive("/completed")
                ? "bg-white text-[#086070]"
                : "text-white hover:bg-blue-50 hover:text-blue-600"}
              `}
            >

              <FaCheckCircle />

              {sidebarOpen && "Completed Skills"}

            </button>

          </nav>

        </div>

      </div>

      {/* Main Section */}

      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >

        {/* Navbar */}

        <div className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 dark:text-gray-200 text-xl"
            >
              <FaBars />
            </button>

            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">

              Welcome Back, {employeeName}

            </h2>

          </div>

          <div className="flex items-center gap-4">

            {/* Dark Mode */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full text-lg text-gray-700 dark:text-yellow-400"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Profile */}

            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >

                <FaUser className="text-xl text-gray-600 dark:text-gray-200"/>

                <FaChevronDown />

              </button>

              {profileOpen && (

                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border">

                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-amber-50"
                  >
                    My Account
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* Page Content */}

        <div className="p-6">
          <Outlet />
        </div>

      </div>

    </div>

  );

};

export default DashboardLayout;