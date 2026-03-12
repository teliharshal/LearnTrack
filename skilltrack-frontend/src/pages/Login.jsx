import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

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

    localStorage.setItem("employeeId", response.data.id);

    localStorage.setItem("employeeId", response.data.id);

    localStorage.getItem("employeeId");

    toast.success("Login Successful");

    setTimeout(() => {
      navigate("/employeeDashboard");
    }, 1200);

  } catch (error) {

    toast.error("Invalid Email or Password");

  }
};

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <Toaster position="top-right" />

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Employee Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-semibold hover:underline"
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
};

export default Login;