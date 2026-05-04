import { useEffect, useState } from "react";
import axios from "axios";

export default function Usertasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/task/list", {
        withCredentials: true
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 mark complete
  const markComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/task/update/${id}`,
        { status: "completed" },
        { withCredentials: true }
      );

      // 🔄 UI update without reload
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: "completed" } : t
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">

      <h1 className="text-2xl font-semibold mb-6">My Tasks</h1>

      <div className="space-y-4">

        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#111] border border-gray-800 p-4 rounded-xl"
          >

            {/* LEFT */}
            <div>
              <p className="text-white font-medium">{task.title}</p>
              <p className="text-gray-400 text-sm">
                {task.projectId?.name}
              </p>
              <p className="text-gray-500 text-xs">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* Status */}
              <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
              </span>

              {/* Complete Button */}
              {task.status !== "completed" && (
                <button
                  onClick={() => markComplete(task._id)}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 text-xs rounded"
                >
                  Complete
                </button>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

/* 🔥 Status Colors */
function getStatusColor(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-400";
    case "completed":
      return "bg-green-500/20 text-green-400";
    case "overdue":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}