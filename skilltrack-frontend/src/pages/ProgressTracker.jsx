import { useEffect, useState } from "react";
import axios from "axios";
import { FaChartLine } from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ProgressTracker = () => {

  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const totalPages = Math.max(1, Math.ceil(skills.length / itemsPerPage));
  const currentSkills = skills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const updateProgress = async (skillId, progress) => {

    try {

      const newProgress = Math.min(progress + 10, 100);

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

  // Bar Chart Data
  const barData = {
    labels: skills.map((s) => s.skillName),
    datasets: [
      {
        label: "Skill Progress %",
        data: skills.map((s) => s.progressPercentage),
        backgroundColor: "#2563eb"
      }
    ]
  };

  // Pie Chart Data
  const categoryCount = {};

  skills.forEach((s) => {
    categoryCount[s.category] =
      (categoryCount[s.category] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        data: Object.values(categoryCount),
        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6"
        ]
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (

    <div className="p-2 md:p-2 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <FaChartLine className="text-blue-600 text-2xl" />

        <h1 className="text-2xl font-bold">
          Progress Tracker
        </h1>

      </div>

      {/* TABLE FIRST */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-4 overflow-x-auto">

        <table className="w-full text-left">

          <thead className="border-b border-gray-200 dark:border-gray-700">

            <tr className="text-gray-600 dark:text-gray-300 text-sm">

              <th className="p-3">Skill</th>
              <th className="p-3">Category</th>
              <th className="p-3">Progress</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {currentSkills.length > 0 ? (
              currentSkills.map((skill) => (

              <tr
                key={skill.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-3 font-medium">
                  {skill.skillName}
                </td>

                <td className="p-3">
                  {skill.category}
                </td>

                <td className="p-3 w-64">

                  <div className="flex items-center gap-3">

                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">

                      <div
                        className="bg-blue-600 h-2 rounded"
                        style={{
                          width: `${skill.progressPercentage}%`
                        }}
                      />

                    </div>

                    <span className="text-sm">
                      {skill.progressPercentage}%
                    </span>

                  </div>

                </td>

                <td className="p-3">

                  {skill.progressPercentage === 100 ? (

                    <span className="text-green-600 font-medium">
                      Completed
                    </span>

                  ) : (

                    <span className="text-yellow-600 font-medium">
                      In Progress
                    </span>

                  )}

                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      updateProgress(
                        skill.id,
                        skill.progressPercentage
                      )
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    + Progress
                  </button>

                </td>

              </tr>

              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-300">
                  No skills found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* CHARTS BELOW TABLE */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bar Chart */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            Skill Progress
          </h2>

          <div className="h-64">

            <Bar
              data={barData}
              options={chartOptions}
            />

          </div>

        </div>

        {/* Pie Chart */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            Skill Categories
          </h2>

          <div className="h-64">

            <Pie
              data={pieData}
              options={chartOptions}
            />

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProgressTracker;