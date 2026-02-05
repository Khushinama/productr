import { useState } from "react";
import React from "react";
import { registerUser } from "../../api/authApi";

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.contact || !formData.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      const res = await registerUser(formData);

      if (res.success) {
        switchToLogin(); // redirect to login
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">
        Create your Productr Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md" />

        <input name="email" placeholder="Email" onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md" />

        <input name="contact" placeholder="Phone Number" onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md" />

        <input name="password" type="password" placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-blue-900 text-white py-2 rounded-md"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <button onClick={switchToLogin} className="text-blue-900 font-semibold">
          Login
        </button>
      </p>
    </>
  );
};

export default Register;
