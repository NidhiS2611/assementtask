import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Settings, X } from 'lucide-react';

const Sidebar = ({ active, toggleSidebar }) => {

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/user' },
    { id: 'tasks', label: 'All Tasks', icon: CheckSquare, path: '/user/tasks' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/user/settings' }
  ];

  return (
    <>
      {/* 🔹 Overlay (mobile) */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden ${active ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* 🔹 Sidebar */}
      <div className={`bg-[#0d0d0d] border-r border-gray-800 w-64 fixed md:relative h-screen z-40 transition-transform duration-300 transform ${active ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* 🔸 Top */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          
          <h1 className="text-lg font-semibold text-purple-400">
            Task Manager
          </h1>

          {/* Mobile close */}
          <button className="md:hidden" onClick={toggleSidebar}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* 🔸 Menu */}
        <nav className="p-4">
          <ul className="space-y-2">

            {menuItems.map(({ id, label, icon: Icon, path }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#1a1a1a] text-white border border-gray-700"
                        : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </NavLink>
              </li>
            ))}

          </ul>
        </nav>

      </div>
    </>
  );
};

export default Sidebar;