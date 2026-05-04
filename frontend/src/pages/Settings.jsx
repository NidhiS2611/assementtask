import { useState } from "react";
import axios from "axios";

export default function Settings() {
  const [form, setForm] = useState({
    name: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔹 input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:3000/user/update",
        form,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Updated successfully");
      setError("");

      // 🔥 reset form
      setForm({ name: "", password: "" });

      // 🔥 auto hide msg
      setTimeout(() => {
        setMessage("");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      setMessage("");

      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="p-6 bg-black  text-white flex justify-center">

      <div className="w-full max-w-md bg-[#0d0d0d] border border-gray-800 p-6 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-semibold mb-4 text-center">
          Settings
        </h1>

        <p className="text-gray-400 text-sm text-center mb-6">
          Update your profile
        </p>

        {/* 🔥 Messages */}
        {message && (
          <div className="bg-green-500/20 text-green-400 text-sm p-2 rounded mb-3 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter new name"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter new password"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* Button */}
          <button className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition duration-300 text-white py-3 rounded-lg font-medium shadow-lg shadow-purple-900/30">
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
}