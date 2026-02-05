import { useState } from "react";
import React from "react";
import { verifyOtp } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const OtpVerify = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const handleVerify = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp(email, otp);

      if (res.success) {
        // ✅ STORE USER GLOBALLY
        setUser(res.user);

        // ✅ REDIRECT TO DASHBOARD
        onVerified();
      } else {
        setError(res.message || "Invalid OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">
        Enter OTP
      </h2>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        className="w-full px-4 py-2 border rounded-md text-center tracking-widest"
        placeholder="123456"
      />

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full bg-blue-900 text-white py-2 rounded-md mt-4"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </>
  );
};

export default OtpVerify;
