import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SkillAnalytics = () => {

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
  const pagedSkills = skills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  }
};

  // Stats
  const completed = skills.filter(s => s.progressPercentage === 100).length;
  const inProgress = skills.filter(s => s.progressPercentage < 100).length;

  // Category Chart
  const categoryData = {
    labels: ["Programming","Frontend","Backend","Database","DevOps"],
    datasets: [
      {
        data: [
          skills.filter(s => s.category === "Programming").length,
          skills.filter(s => s.category === "Frontend").length,
          skills.filter(s => s.category === "Backend").length,
          skills.filter(s => s.category === "Database").length,
          skills.filter(s => s.category === "DevOps").length
        ],
        backgroundColor: [
          "#3B82F6",
          "#8B5CF6",
          "#10B981",
          "#F59E0B",
          "#EF4444"
        ]
      }
    ]
  };

  // Level Chart
  const levelData = {
    labels: ["Beginner","Intermediate","Advanced"],
    datasets: [
      {
        label: "Skills",
        data: [
          skills.filter(s => s.level === "Beginner").length,
          skills.filter(s => s.level === "Intermediate").length,
          skills.filter(s => s.level === "Advanced").length
        ],
        backgroundColor: [
          "#60A5FA",
          "#FBBF24",
          "#34D399"
        ]
      }
    ]
  };

  // Completion Chart
  const completionData = {
    labels: ["Completed","In Progress"],
    datasets: [
      {
        data: [completed, inProgress],
        backgroundColor: [
          "#22C55E",
          "#F59E0B"
        ]
      }
    ]
  };

  // Progress Chart
  const progressData = {
    labels: skills.map(s => s.skillName),
    datasets: [
      {
        label: "Progress %",
        data: skills.map(s => s.progressPercentage),
        backgroundColor: "#3B82F6"
      }
    ]
  };

  // Monthly Growth Timeline
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const monthlyCounts = new Array(12).fill(0);

  skills.forEach(skill => {

    if(skill.startDate){

      const month = new Date(skill.startDate).getMonth();

      monthlyCounts[month]++;

    }

  });

  const timelineData = {

    labels: monthNames,

    datasets: [

      {
        label: "Skills Started",
        data: monthlyCounts,
        borderColor: "#6366F1",
        backgroundColor: "#A5B4FC",
        tension: 0.4,
        fill: true
      }

    ]

  };

  return (

    <div className="space-y-8 text-gray-900 dark:text-gray-100">

      <h1 className="text-2xl font-bold">
        Skill Analytics
      </h1>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Skill Categories
          </h2>

          <div className="h-64">

            <Pie data={categoryData} options={chartOptions}/>

          </div>

        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Skill Level Distribution
          </h2>

          <div className="h-64">

            <Bar data={levelData} options={chartOptions}/>

          </div>

        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Completion Rate
          </h2>

          <div className="h-64">

            <Pie data={completionData} options={chartOptions}/>

          </div>

        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Skill Progress
          </h2>

          <div className="h-64">

            <Bar data={progressData} options={chartOptions}/>

          </div>

        </div>

      </div>

      {/* Monthly Timeline */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Skill Growth Timeline
        </h2>

        <div className="h-72">

          <Line data={timelineData} options={chartOptions}/>

        </div>

      </div>

      {/* Top Skills Table */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Top Skills Progress
        </h2>

        <table className="w-full text-sm text-gray-900 dark:text-gray-100">

          <thead>

            <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-300">

              <th className="py-2">Skill</th>
              <th>Category</th>
              <th>Level</th>
              <th>Progress</th>

            </tr>

          </thead>

          <tbody>

            {pagedSkills.length > 0 ? (
              pagedSkills.map((skill) => (

                <tr key={skill.id} className="border-b border-gray-200 dark:border-gray-700">

                  <td className="py-2 font-medium">
                    {skill.skillName}
                  </td>

                  <td>
                    {skill.category}
                  </td>

                  <td>
                    {skill.level}
                  </td>

                  <td>
                    {skill.progressPercentage}%
                  </td>

                </tr>

              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500 dark:text-gray-300">
                  No skills found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
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

    </div>

  );

};

export default SkillAnalytics;