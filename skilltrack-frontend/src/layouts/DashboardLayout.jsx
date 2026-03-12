import { Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaFire,
  FaCheckCircle,
  FaUser,
  FaBars,
  FaSearch,
  FaBell,
  FaChevronDown
} from "react-icons/fa";

import { useState } from "react";

const DashboardLayout = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/employeeDashboard" },
    { name: "Progress Tracker", icon: <FaChartLine />, path: "/progress" },
    { name: "Consistency", icon: <FaFire />, path: "/consistency" },
    { name: "Completed Skills", icon: <FaCheckCircle />, path: "/completed" }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuOpen(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 bg-white w-64 h-screen shadow-lg
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >

        <div className="p-6">

          <h2 className="text-2xl font-bold text-blue-600 mb-8">
            SkillTrack
          </h2>

          <nav className="flex flex-col gap-2">

            {menuItems.map((item, index) => (

              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600"
              >
                {item.icon}
                {item.name}
              </button>

            ))}

          </nav>

        </div>

      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center gap-4">

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 text-xl md:hidden"
            >
              <FaBars />
            </button>

            <h2 className="text-lg font-semibold text-gray-700">
              Good Morning, {localStorage.getItem("employeeName") || "Employee"}
            </h2>

          </div>

          {/* Right */}
          <div className="flex items-center gap-6">

            {/* Search */}
            <div className="hidden lg:flex items-center bg-gray-100 px-3 py-2 rounded-lg">

              <FaSearch className="text-gray-500 mr-2" />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm"
              />

            </div>

            {/* Notification */}
            <div className="relative cursor-pointer">

              <FaBell className="text-gray-600 text-lg" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>

            </div>

            {/* Profile Dropdown */}
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >

                <FaUser className="text-xl text-gray-600" />

                <span className="hidden md:block text-gray-700 font-medium">
                  {localStorage.getItem("employeeName") || "User"}
                </span>

                <FaChevronDown className="text-gray-500 text-sm" />

              </button>

              {profileOpen && (

                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border z-50">

                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
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