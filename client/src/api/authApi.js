import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// ================= AUTH =================

// Register
export const registerUser = (data) =>
  API.post("/api/auth/register", data).then((res) => res.data);

// Login → Send OTP
export const sendOtp = (email) =>
  API.post("/api/auth/send-otp", { email }).then((res) => res.data);

// Verify OTP
export const verifyOtp = (email, otp) =>
  API.post("/api/auth/verify-account", { email, otp }).then((res) => res.data);

// ================= PROFILE =================

// Upload profile picture
export const uploadProfilePic = (formData) =>
  API.post("/api/auth/upload-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);

// Logout
export const logoutUser = () =>
  API.post("/api/auth/logout").then((res) => res.data);

// Resend OTP
export const resendOtp = (email) =>
  API.post("/auth/send-reset-otp", { email }).then((res) => res.data);
