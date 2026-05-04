import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: ""
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔥 Fetch users & projects
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await axios.get("http://localhost:3000/user/allusers", {
        withCredentials: true
      });

      const projRes = await axios.get("http://localhost:3000/project/list", {
        withCredentials: true
      });

      setUsers(userRes.data);
      setProjects(projRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/task/create",
        form,
        { withCredentials: true }
      );

      setMessage("✅ Task created");
      setError("");

      setTimeout(() => {
         setMessage("");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Error creating task");
      setMessage("");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-black px-4">

      <div className="w-full max-w-md p-6 rounded-2xl border border-gray-800 bg-[#0d0d0d] shadow-xl">

        <h2 className="text-white text-xl font-semibold mb-4 text-center">
          Create Task
        </h2>

        {/* Messages */}
        {message && <p className="text-green-400 text-center mb-2">{message}</p>}
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded text-white"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded text-white"
          />

          {/* Project Dropdown */}
          <select
            name="projectId"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded text-white"
            required
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* User Dropdown */}
          <select
            name="assignedTo"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded text-white"
          >
            <option value="">Assign Member</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Due Date */}
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            className="bg-[#111] border border-gray-800 p-3 rounded text-white"
            required
          />

          {/* Button */}
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded text-white font-medium">
            Create Task
          </button>

        </form>

      </div>
    </div>
  );
}