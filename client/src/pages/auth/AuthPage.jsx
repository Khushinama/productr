import { useState } from "react";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import OtpVerify from "./OtpVerify";

const AuthPage = () => {
  const [step, setStep] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT IMAGE (HIDDEN ON MOBILE) */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="/Frame.jpeg"
          alt="frame"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">

          {step === "login" && (
            <Login
              onOtpSent={(email) => {
                setLoginEmail(email);
                setStep("otp");
              }}
              switchToRegister={() => setStep("register")}
            />
          )}

          {step === "register" && (
            <Register switchToLogin={() => setStep("login")} />
          )}

          {step === "otp" && (
            <OtpVerify
              email={loginEmail}
              onVerified={() => {
                window.location.href = "/dashboard";
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthPage;
