import { useState } from "react";
import React from "react";
import { sendOtp } from "../../api/authApi";

const Login = ({ onOtpSent, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("Email is required");

    try {
      setLoading(true);
      const res = await sendOtp(email);

      if (res.success) {
        onOtpSent(email);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">
        Login to your Product Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-blue-900 text-white py-2 rounded-md"
        >
          {loading ? "Sending OTP..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <button onClick={switchToRegister} className="text-blue-900 font-semibold">
          Sign Up
        </button>
      </p>
    </>
  );
};

export default Login;
