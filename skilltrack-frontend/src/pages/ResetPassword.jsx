import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleReset = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        {
          email: formData.email,
          otp: formData.otp
        }
      );

      await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        {
          email: formData.email,
          newPassword: formData.newPassword
        }
      );

      toast.success("Password Reset Successful");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {

      toast.error("Invalid OTP or Error");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-purple-600">

      <Toaster position="top-right" />

      <div className="bg-white p-8 rounded-xl w-[420px]">

        <h2 className="text-2xl font-bold mb-4">

          Reset Password

        </h2>

        <form onSubmit={handleReset} className="space-y-4">

          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>

  );

};

export default ResetPassword;