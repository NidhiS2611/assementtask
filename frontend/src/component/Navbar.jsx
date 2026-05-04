import { Menu, Bell } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ userName, toggleSidebar }) => {
  const navigate = useNavigate();
  const [hasUnread] = useState(true); // optional

  const getTitle = () => {
    const path = window.location.pathname.split("/")[2];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';
  };

  const logouthandler = () => {
    const res = axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });
    res.then(() => {
      navigate("/login");
    });
  };

  return (
    <header className="bg-[#0d0d0d] border-b border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20">

      {/* 🔹 LEFT */}
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden text-purple-400"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-white">
          {getTitle()}
        </h2>
      </div>

      {/* 🔹 RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🔔 Notification */}
       

        {/* 👤 Username */}
        <p className="text-sm text-gray-300 hidden sm:block">
          {userName}
        </p>

        {/* 🚪 Logout */}
        <button
          onClick={logouthandler}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition shadow-lg shadow-purple-900/30"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Navbar;