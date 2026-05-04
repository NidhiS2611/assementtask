import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios.get("http://localhost:3000/user/me", {
      withCredentials: true
    })
    .then(() => {
      setStatus("success");
    })
    .catch(() => {
      setStatus("error");
    });
  }, []);

  // 🔄 Loading UI (premium bana diya)
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-gray-400">Checking authentication...</p>
      </div>
    );
  }

  // ❌ Unauthorized → redirect
  if (status === "error") {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return children;
};

export default Protected;