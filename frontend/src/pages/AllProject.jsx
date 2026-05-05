import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://terrific-benevolence-production-21ee.up.railway.app/project/list", {
        withCredentials: true
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE FUNCTION
  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://terrific-benevolence-production-21ee.up.railway.app/project/delete/${id}`, {
        withCredentials: true
      });

      // 🔥 UI update without reload
      setProjects(projects.filter((p) => p._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">

      {/* 🔥 Title + Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Projects</h1>

        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
            <Link to="/admin/create-project">+ Create Project</Link>
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-400">No projects found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-[#111] border border-gray-800 rounded-2xl p-5 hover:border-purple-500 transition"
            >

              {/* Name */}
              <h2 className="text-lg font-semibold text-white">
                {proj.name}
              </h2>

              {/* Desc */}
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {proj.description || "No description"}
              </p>

              {/* Bottom */}
              <div className="mt-4 flex justify-between items-center">

                <span className="text-xs bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full">
                  {proj.taskCount} Tasks
                </span>

                <span className="text-xs text-gray-500">
                  {proj.createdAt
                    ? new Date(proj.createdAt).toLocaleDateString()
                    : "No Date"}
                </span>

              </div>

              {/* 🔥 Delete Button */}
              <button
                onClick={() => deleteProject(proj._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-sm"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}