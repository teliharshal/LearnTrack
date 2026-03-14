import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaMoon, FaSun, FaEye } from "react-icons/fa";
import logo from "../assets/codeverge-transperant_Logo-removebg-preview.png";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
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

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );

      localStorage.setItem("employeeName", response.data.name);
      localStorage.setItem("employeeId", response.data.id);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/employeeDashboard");
      }, 1200);

    } catch (error) {
      toast.error("Invalid Email or Password");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600
    dark:from-red-700 dark:via-blue-900 dark:to-purple-900
    transition-all duration-500">

      <Toaster position="top-right" />

      {/* Dark Mode Toggle */}

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-md
        p-3 rounded-full text-white text-lg"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Login Card */}

      <div className="w-[420px] bg-white dark:bg-[#1e293b]
      rounded-2xl shadow-2xl p-8 text-center
      transition-all duration-300">

        {/* Logo */}

        <div className="mb-4">
          <img
            src={logo}
            alt="Codeverge Logo"
            className="mx-auto h-16 w-auto"
          />
        </div>

        {/* Title */}

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">

          SkillTrack

        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">

          Welcome back! Please sign in to continue

        </p>

        {/* Form */}

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}

          <div className="text-left">

            <label className="text-sm text-gray-600 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg
              border dark:border-gray-600
              bg-gray-100 dark:bg-[#0f172a]
              text-gray-800 dark:text-white
              outline-none"
            />

          </div>

          {/* Password */}

          <div className="text-left relative">

            <label className="text-sm text-gray-600 dark:text-gray-300">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg
              border dark:border-gray-600
              bg-gray-100 dark:bg-[#0f172a]
              text-gray-800 dark:text-white
              outline-none"
            />

            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 cursor-pointer"
            />

          </div>

          {/* Remember + Forgot */}

          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

              <input type="checkbox" />

              Remember me

            </label>

           <span onClick={() => navigate("/forgotPassword")}
          className="text-blue-500 cursor-pointer hover:underline"
          >
       Forgot password?
</span>

          </div>

          {/* Sign In Button */}

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold
            bg-gradient-to-r from-purple-600 to-indigo-600
            hover:opacity-90 transition"
          >
            Sign In
          </button>

        </form>

      </div>

      {/* Footer */}

      <p className="absolute bottom-6 text-white text-sm opacity-80">

        © 2026 SkillTrack - Skill Management System. All rights reserved.

      </p>

    </div>

  );

};

export default Login;