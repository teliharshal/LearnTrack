import { Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaFire,
  FaCheckCircle,
  FaUser,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

import { useState } from "react";

const DashboardLayout = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/employeeDashboard" },
    { name: "Progress Tracker", icon: <FaChartLine />, path: "/progress" },
    { name: "Consistency", icon: <FaFire />, path: "/consistency" },
    { name: "Completed Skills", icon: <FaCheckCircle />, path: "/completed" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Logout", icon: <FaSignOutAlt /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("employeeId");
    navigate("/");
  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Mobile Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white w-64 h-screen shadow-lg fixed md:static
        transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform`}
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

                  if (item.name === "Logout") {
                    handleLogout();
                  } else {
                    navigate(item.path);
                  }

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

      {/* Page Content */}
      <div className="flex-1 p-6">

        <Outlet />

      </div>

    </div>

  );

};

export default DashboardLayout;