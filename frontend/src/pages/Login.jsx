import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        form,
        { withCredentials: true }
      );

      const user = res.data.user;

      setMessage("Login successful ✅");

      // ⏳ thoda delay for UX
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      {/* 🔔 Message */}
      {(message || error) && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          {message && (
            <div className="bg-green-900/80 border border-green-600 text-green-300 px-6 py-3 rounded shadow-lg">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-900/80 border border-red-600 text-red-300 px-6 py-3 rounded shadow-lg">
              {error}
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl border border-gray-800 bg-[#0d0d0d] shadow-xl shadow-purple-900/20">

        <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2 text-center">
          Welcome back
        </h2>

        <p className="text-gray-400 text-xs sm:text-sm mb-6 text-center">
          Login to Task Manager
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-2.5 sm:p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-2.5 sm:p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <div className="flex justify-end text-xs sm:text-sm">
            <span className="text-purple-400 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition text-white py-2.5 sm:py-3 rounded-lg font-medium shadow-lg shadow-purple-900/30"
          >
            Sign in
          </button>

        </form>

        <p className="text-gray-400 text-xs sm:text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <span className="text-purple-400 hover:underline">
            <Link to="/">Create account</Link>
          </span>
        </p>

      </div>
    </div>
  );
}