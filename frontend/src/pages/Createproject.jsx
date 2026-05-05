import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Createproject() {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://terrific-benevolence-production-21ee.up.railway.app/project/create",
        form,
        { withCredentials: true }
      );

      setMessage("✅ Project created successfully");
      setError("");

      // 🔥 2 sec baad redirect
      setTimeout(() => {
        navigate("/admin/projects");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-black px-4">

      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-gray-800 bg-[#0d0d0d] shadow-xl shadow-purple-900/20">

        <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2 text-center">
          Create Project
        </h2>

        <p className="text-gray-400 text-sm mb-6 text-center">
          Add a new project
        </p>

        {/* 🔥 Messages */}
        {message && (
          <div className="bg-green-500/20 text-green-400 text-sm p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Project Name */}
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="bg-[#111] border border-gray-800 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* Button */}
          <button className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition duration-300 text-white py-3 rounded-lg font-medium shadow-lg shadow-purple-900/30">
            Create Project
          </button>

        </form>

      </div>
    </div>
  );
}