import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaTools
} from "react-icons/fa";

const MySkills = () => {

  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const navigate = useNavigate();

  const employeeId = Number(localStorage.getItem("employeeId"));

  useEffect(() => {
    fetchSkills();
  }, []);

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

  const filteredSkills = skills.filter((skill) => {

    const matchesSearch =
      skill.skillName.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || skill.category === categoryFilter;

    return matchesSearch && matchesCategory;

  });

  return (

    <div className="text-gray-800 dark:text-gray-200">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">

        <h1 className="text-2xl font-bold">
          My Skills
        </h1>

        <button
          onClick={() => navigate("/addSkill")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Add Skill
        </button>

      </div>

      {/* Filters */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 w-full md:w-64 text-gray-700 dark:text-gray-200"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 w-full md:w-48 text-gray-700 dark:text-gray-200"
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="DevOps">DevOps</option>
        </select>

      </div>

      {/* Skills Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredSkills.map((s) => (

          <div
            key={s.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* Skill Header */}

            <div className="flex items-center gap-3 mb-4">

              {getCategoryIcon(s.category)}

              <div>

                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {s.skillName}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {s.category} • {s.level || "Beginner"}
                </p>

              </div>

            </div>

            {/* Progress */}

            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>
              <span>{s.progressPercentage}%</span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mb-3">

              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${s.progressPercentage}%` }}
              />

            </div>

            {/* Remaining Days */}

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Remaining Days: {getRemainingDays(s.startDate, s.targetDurationDays)}
            </p>

            {/* Update Progress */}

            <button
              onClick={() => updateProgress(s.id, s.progressPercentage)}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Update Progress
            </button>

          </div>

        ))}

      </div>

      {/* Empty State */}

      {filteredSkills.length === 0 && (

        <p className="text-gray-500 dark:text-gray-400 mt-6">
          No skills found.
        </p>

      )}

    </div>

  );

};

export default MySkills;