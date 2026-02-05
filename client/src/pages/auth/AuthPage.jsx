import { useState } from "react";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import OtpVerify from "./OtpVerify";

const AuthPage = () => {
  const [step, setStep] = useState("login"); // login | register | otp
  const [loginEmail, setLoginEmail] = useState("");

  return (
    <div className="min-h-screen flex bg-white p-4">
      <img src="/public/Frame.jpeg" className="w-1/2 h-screen" alt="frame" />

      {/* LEFT SECTION (UNCHANGED UI) */}
      {/* <div className="hidden lg:flex w-[48%] rounded-3xl overflow-hidden relative">
        <img
          src="/public/background.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />

        <div className="absolute top-6 left-6 z-10">
          <img src="/public/logo.jpeg" alt="Logo" />
        </div>

        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="w-[300px] h-[500px] rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src="/public/card.jpeg"
              className="w-full h-full object-cover"
            />
            <p className="absolute bottom-6 w-full text-center text-white text-sm">
              Uplist your product to market
            </p>
          </div>
        </div> 
      </div>*/}

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-[52%] flex items-center justify-center">
        <div className="w-full max-w-md px-6">

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
