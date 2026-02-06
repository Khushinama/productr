import React, { useEffect, useRef, useState } from "react";
import { verifyOtp, resendOtp } from "../../api/authApi";
import toast from 'react-hot-toast'

const VerifyOtp = ({ email, onVerified }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(20);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6)
      return setError("Please enter 6 digit OTP");

    try {
      setLoading(true);
      toast.loading("Verifying OTP...");
      const res = await verifyOtp(email, finalOtp);
      
      if (res.success) {
        toast.success("OTP verified successfully");
        onVerified(res.user);
      } else {
        setError(res.message);
        toast.error(res.message);
      }
    } catch (err) {
      setError("Invalid OTP");
      toast.error("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await resendOtp(email);
      if (res.success) {
        setTimer(20);
        setOtp(Array(6).fill(""));
        inputsRef.current[0].focus();
        toast.success("OTP resent successfully");
        toast.success(`Your new OTP is: ${res.otp}`);
      }
    } catch (err) {
      setError("Failed to resend OTP");
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-900 mb-6 text-center">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="text-center">
          <p className="text-sm text-gray-500 mb-4 text-left">
            Enter OTP sent to your email
          </p>

          <div className="flex justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-11 h-11 sm:w-12 sm:h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 ${
                  error ? "border-red-500" : "focus:ring-blue-900"
                }`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-md"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Didn’t receive OTP?{" "}
            {timer > 0 ? (
              <span className="text-blue-900 font-semibold">
                Resend in {timer}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-900 font-semibold underline"
              >
                Resend OTP
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
