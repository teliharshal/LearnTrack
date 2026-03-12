import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      formData
    );

    console.log(response.data);

    alert("Employee registered successfully!");
    navigate("/login");

  } catch (error) {

    console.error(error);

  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Employee Registration
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <input
         type="text"
         name="name"
         placeholder="Full Name"
         value={formData.name}
         onChange={handleChange}
         className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
         required
/>

         <input
         type="email"
         name="email"
         placeholder="Email"
         value={formData.email}
         onChange={handleChange}
         className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
         required
/>

          <input
         type="password"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  required
/>

          {/* Department */}
         <input
         type="text"
         name="department"
         placeholder="Department"
         value={formData.department}
         onChange={handleChange}
         className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

          {/* Register Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>

        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;