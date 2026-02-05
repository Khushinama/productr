import { useState } from "react";
import React from "react";
import { sendOtp } from "../../api/authApi";
import toast from 'react-hot-toast'

const Login = ({ onOtpSent, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Sending OTP...");
      const res = await sendOtp(email);
      

      if (res.success) {
        toast.success("OTP sent successfully");
        onOtpSent(email);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
  
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6 text-center">
          Login to your Productr Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                error ? "border-red-500" : ""
              }`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            {loading ? "Sending OTP..." : "Login"}
          </button>
        </form>
      </div>

      {/* SIGN UP */}
      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-gray-600 text-sm sm:text-base">
          Don’t have a Productr Account?
        </p>
        <button
          onClick={switchToRegister}
          className="text-blue-900 font-semibold mt-1"
        >
          Sign up here
        </button>
      </div>
    </div>
  );
};

export default Login;
