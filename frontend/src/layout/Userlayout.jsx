import Sidebar from '../component/Sidebar';
import Header from '../component/Navbar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Userlayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios.get("http://localhost:3000/user/me", { withCredentials: true })
      .then((res) => setUserName(res.data.user.name))
      .catch((err) => console.log("User fetch error:", err));
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white">
      
      {/* Sidebar */}
      <Sidebar active={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <Header userName={userName} toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="p-4 bg-black">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Userlayout;