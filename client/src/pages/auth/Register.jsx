import { useState } from "react";
import React from "react";
import { registerUser } from "../../api/authApi";
import toast from 'react-hot-toast'

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidPhone = (value) =>
    /^[0-9]{10}$/.test(value);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.contact.trim())
      newErrors.contact = "Phone number is required";
    else if (!isValidPhone(formData.contact))
      newErrors.contact = "Phone number must be 10 digits";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      toast.loading("Registering user...");
      const res = await registerUser(formData);

      if (res.success) {
        toast.success("Registration successful!");
        switchToLogin();
      } else {
        setErrors({ form: res.message });
      }
    } catch (err) {
      setErrors({
        form: err.response?.data?.message || "Registration failed",
      });
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-semibold text-blue-900 mb-6 text-center">
        Create your Productr Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <div>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <input
            name="contact"
            placeholder="Phone Number"
            value={formData.contact}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.contact ? "border-red-500" : ""
            }`}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {errors.form && (
          <p className="text-red-500 text-sm text-center">
            {errors.form}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-900 text-white py-2.5 rounded-md"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-blue-900 font-semibold"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
