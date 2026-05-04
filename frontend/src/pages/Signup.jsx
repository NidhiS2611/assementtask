import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
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
        "http://localhost:3000/user/register",
        form,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Signup successful ✅");

      // ⏳ 2 sec baad login page
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">

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

      <div className="w-[350px] p-8 rounded-2xl border border-gray-800 shadow-xl bg-[#0d0d0d]">

        <h2 className="text-white text-2xl font-semibold mb-2">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Signup to Task Manager
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <select
            name="role"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>

          {/* 🔥 Button */}
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition text-white py-3 rounded-lg font-medium shadow-lg shadow-purple-900/30"
          >
            Sign up
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span className="text-purple-400 hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </p>

      </div>
    </div>
  );
}