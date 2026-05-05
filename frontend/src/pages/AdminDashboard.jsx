import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://terrific-benevolence-production-21ee.up.railway.app/user/admin/dashboard", {
      withCredentials: true
    })
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-gray-400">
        Loading Admin Dashboard...
      </div>
    );
  }

  const { stats, recentTasks, recentProjects } = data;

  return (
    <div className="p-6 bg-black min-h-screen text-white">

      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

        <StatCard title="Projects" value={stats.totalProjects} color="purple" />
        <StatCard title="Tasks" value={stats.totalTasks} color="blue" />
        <StatCard title="Users" value={stats.totalUsers} color="pink" />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="Completed" value={stats.completed} color="green" />
        <StatCard title="Overdue" value={stats.overdue} color="red" />

      </div>

      {/* 🔥 Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* Recent Tasks */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>

          {recentTasks.length === 0 ? (
            <p className="text-gray-400 text-sm">No tasks yet</p>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-[#0d0d0d] p-3 rounded-lg border border-gray-800"
                >
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-gray-400">
                      {task.projectId?.name} • {task.assignedTo?.name}
                    </p>
                  </div>

                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>

          {recentProjects.length === 0 ? (
            <p className="text-gray-400 text-sm">No projects yet</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((proj) => (
                <div
                  key={proj._id}
                  className="bg-[#0d0d0d] p-3 rounded-lg border border-gray-800"
                >
                  <p className="text-sm font-medium">{proj.name}</p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(proj.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

/* 🔥 Stats Card */
function StatCard({ title, value, color }) {
  const colors = {
    purple: "from-purple-600 to-indigo-600",
    blue: "from-blue-500 to-cyan-600",
    pink: "from-pink-500 to-rose-600",
    yellow: "from-yellow-500 to-orange-500",
    green: "from-green-500 to-emerald-600",
    red: "from-red-500 to-pink-600"
  };

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-r ${colors[color]} shadow-lg`}>
      <p className="text-xs text-white/80">{title}</p>
      <h2 className="text-xl font-bold mt-1">{value}</h2>
    </div>
  );
}

/* 🔥 Status Color */
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