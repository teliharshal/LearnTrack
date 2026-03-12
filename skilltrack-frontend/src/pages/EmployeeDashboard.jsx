import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaChartLine,
  FaFire,
  FaCheckCircle,
  FaBars,
  FaCode,
  FaDatabase,
  FaServer,
  FaLaptopCode,
  FaTools
} from "react-icons/fa";

const EmployeeDashboard = () => {

  const [skills, setSkills] = useState([]);

  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const employeeId = Number(localStorage.getItem("employeeId"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, []);

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/employee/skills/${employeeId}`
      );

      setSkills(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  // Logout
  const handleLogout = () => {
    navigate("/");
  };

  // Add Skill
const handleAddSkill = async () => {

  if (!skillName || !category || !duration) {
    alert("Please fill all fields");
    return;
  }

  try {

    const employeeId = Number(localStorage.getItem("employeeId"));

    console.log("Employee ID sending:", employeeId);

    await axios.post(
      "http://localhost:8080/api/employee/skills/add",
      {
        employeeId: employeeId,
        skillName: skillName,
        category: category,
        progressPercentage: 0,
        targetDurationDays: Number(duration)
      }
    );

    setSkillName("");
    setCategory("");
    setDuration("");

    fetchSkills();

  } catch (error) {
    console.error(error);
  }

};

  // Update progress
  const updateProgress = async (skillId, currentProgress) => {

    try {

      const newProgress = Math.min(currentProgress + 10, 100);

      await axios.put(
        `http://localhost:8080/api/employee/skills/progress/${skillId}`,
        {
          progressPercentage: newProgress
        }
      );

      fetchSkills();

    } catch (error) {
      console.error(error);
    }

  };

  // Skill Icon
  const getCategoryIcon = (category) => {

    switch (category) {

      case "Programming":
        return <FaCode className="text-blue-600 text-xl" />;

      case "Frontend":
        return <FaLaptopCode className="text-purple-600 text-xl" />;

      case "Backend":
        return <FaServer className="text-green-600 text-xl" />;

      case "Database":
        return <FaDatabase className="text-yellow-600 text-xl" />;

      case "DevOps":
        return <FaTools className="text-red-600 text-xl" />;

      default:
        return <FaCode className="text-gray-600 text-xl" />;

    }

  };

  // Remaining Days
  const getRemainingDays = (startDate, duration) => {

    if (!startDate || !duration) return "-";

    const start = new Date(startDate);
    const today = new Date();

    const passedDays = Math.floor(
      (today - start) / (1000 * 60 * 60 * 24)
    );

    const remaining = duration - passedDays;

    return remaining > 0 ? remaining : 0;

  };

  // Stats
  const totalSkills = skills.length;

  const completed = skills.filter(
    (s) => s.progressPercentage === 100
  ).length;

  const inProgress = skills.filter(
    (s) => s.progressPercentage < 100
  ).length;

  // const menuItems = [
  //   { name: "Dashboard", icon: <FaTachometerAlt />, path: "/employeeDashboard" },
  //   { name: "Progress Tracker", icon: <FaChartLine />, path: "/progress" },
  //   { name: "Consistency", icon: <FaFire />, path: "/consistency" },
  //   { name: "Completed Skills", icon: <FaCheckCircle />, path: "/completed" },
  //   { name: "Profile", icon: <FaUser />, path: "/profile" },
  //   { name: "Logout", icon: <FaSignOutAlt /> }
  // ];

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Mobile Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded"
      >
        <FaBars />
      </button>

      {/* Sidebar
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
                  } else if (item.path) {
                    navigate(item.path);
                  }

                }}
                className={`flex items-center gap-3 px-4 py-2 rounded
                hover:bg-blue-50 hover:text-blue-600
                ${item.name === "Logout" ? "hover:text-red-600" : ""}`}
              >

                {item.icon}
                {item.name}

              </button>

            ))}

          </nav> */}

        {/* </div>

      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-8">
          Employee Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Skills</p>
              <h2 className="text-2xl font-bold">{totalSkills}</h2>
            </div>
            <FaCode className="text-blue-600 text-2xl" />
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <h2 className="text-2xl font-bold">{completed}</h2>
            </div>
            <FaCheckCircle className="text-green-600 text-2xl" />
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">In Progress</p>
              <h2 className="text-2xl font-bold">{inProgress}</h2>
            </div>
            <FaChartLine className="text-yellow-600 text-2xl" />
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Learning Streak</p>
              <h2 className="text-2xl font-bold">7 Days</h2>
            </div>
            <FaFire className="text-red-600 text-2xl" />
          </div>

        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* My Skills */}
          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-semibold mb-6">
              My Skills
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {skills.map((s) => (

                <div
                  key={s.id}
                  className="p-5 bg-gray-50 rounded-xl border hover:shadow-md transition"
                >

                  <div className="flex items-center gap-3 mb-3">

                    {getCategoryIcon(s.category)}

                    <div>
                      <p className="font-semibold text-gray-800">
                        {s.skillName}
                      </p>

                      <p className="text-xs text-gray-500">
                        {s.category}
                      </p>
                    </div>

                  </div>

                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{s.progressPercentage}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded mb-3">

                    <div
                      className="bg-blue-600 h-2 rounded"
                      style={{ width: `${s.progressPercentage}%` }}
                    />

                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    Remaining Days:{" "}
                    {getRemainingDays(
                      s.startDate,
                      s.targetDurationDays
                    )}
                  </p>

                  <button
                    onClick={() =>
                      updateProgress(s.id, s.progressPercentage)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                  >
                    Update Progress
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* Add Skill */}
         <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

  <div className="flex items-center gap-3 mb-6">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
      <FaCode />
    </div>

    <h2 className="text-xl font-semibold text-gray-800">
      Add New Skill
    </h2>
  </div>

  {/* Skill Name */}
  <div className="mb-4">
    <label className="text-sm text-gray-600 font-medium">
      Skill Name
    </label>

    <input
      type="text"
      placeholder="Enter skill (React, Java, Spring Boot...)"
      value={skillName}
      onChange={(e) => setSkillName(e.target.value)}
      className="w-full mt-2 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition"
    />
  </div>

  {/* Category */}
  <div className="mb-4">
    <label className="text-sm text-gray-600 font-medium">
      Category
    </label>

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full mt-2 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition"
    >
      <option value="">Select Category</option>
      <option value="Programming">Programming</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="Database">Database</option>
      <option value="DevOps">DevOps</option>
      <option value="General">General</option>
    </select>
  </div>

  {/* Duration */}
  <div className="mb-6">
    <label className="text-sm text-gray-600 font-medium">
      Target Duration
    </label>

    <input
      type="number"
      placeholder="Enter duration in days"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
      className="w-full mt-2 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition"
    />
  </div>

  {/* Button */}
  <button
    onClick={handleAddSkill}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
  >
    Add Skill
  </button>

</div>

        </div>

      </div>

    </div>

  );

};

export default EmployeeDashboard;