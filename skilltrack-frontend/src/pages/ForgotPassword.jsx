import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSendOtp = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/api/auth/send-otp",
        { email }
      );

      toast.success("OTP Sent Successfully");

      setTimeout(() => {
        navigate("/resetPassword", { state: { email } });
      }, 1500);

    } catch (error) {

      toast.error("Email not registered");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-blue-500">

      <Toaster position="top-right" />

      <div className="bg-white p-8 rounded-xl w-[400px]">

        <h2 className="text-2xl font-bold mb-4">

          Forgot Password

        </h2>

        <form onSubmit={handleSendOtp} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Send OTP
          </button>

        </form>

      </div>

    </div>

  );

};

export default ForgotPassword;