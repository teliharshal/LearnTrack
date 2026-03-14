import { useState, useEffect } from "react";

import axios from "axios";

import {
  FaChartLine,
  FaFire,
  FaCheckCircle,
  FaCode
} from "react-icons/fa";

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

import { Bar, Pie, Line } from "react-chartjs-2";

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

const EmployeeDashboard = () => {

  const [skills, setSkills] = useState([]);
  

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

  // Dashboard Stats
  const totalSkills = skills.length;
  const completed = skills.filter(s => s.progressPercentage === 100).length;
  const inProgress = skills.filter(s => s.progressPercentage < 100).length;

  // Chart Options
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

  // Category Chart
  const categoryData = {
    labels: ["Programming", "Frontend", "Backend", "Database", "DevOps"],
    datasets: [
      {
        label: "Skills",
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

  // Completion Chart
  const completionData = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        data: [completed, inProgress],
        backgroundColor: ["#22C55E", "#F59E0B"]
      }
    ]
  };

  return (

    <div className="space-y-8 text-gray-900 dark:text-gray-100">
    

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Total Skills</p>
            <h2 className="text-2xl font-bold">{totalSkills}</h2>
          </div>
          <FaCode className="text-blue-600 text-2xl"/>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Completed</p>
            <h2 className="text-2xl font-bold">{completed}</h2>
          </div>
          <FaCheckCircle className="text-green-600 text-2xl"/>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">In Progress</p>
            <h2 className="text-2xl font-bold">{inProgress}</h2>
          </div>
          <FaChartLine className="text-yellow-600 text-2xl"/>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Learning Streak</p>
            <h2 className="text-2xl font-bold">7 Days</h2>
          </div>
          <FaFire className="text-red-600 text-2xl"/>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Category Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Skill Categories
          </h2>

          <div className="h-64">
            <Pie data={categoryData} options={chartOptions}/>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Skill Progress
          </h2>

          <div className="h-64">
            <Bar data={progressData} options={chartOptions}/>
          </div>
        </div>

        {/* Completion Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Completion Overview
          </h2>

          <div className="h-64">
            <Pie data={completionData} options={chartOptions}/>
          </div>
        </div>

        {/* Learning Trend */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Learning Trend
          </h2>

          <div className="h-64">
            <Line data={progressData} options={chartOptions}/>
          </div>
        </div>

      </div>

    </div>

  );

};

export default EmployeeDashboard;