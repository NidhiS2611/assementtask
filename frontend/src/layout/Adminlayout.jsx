import AdminSidebar from '../component/AdminSidebar';
import Header from '../component/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Adminlayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios.get("http://localhost:3000/user/me", {
      withCredentials: true
    })
    .then((res) => {
      // 🔥 only admin allow
      if (res.data.user.role !== "admin") {
        navigate("/user"); // user ko user dashboard bhej
      }
      setUserName(res.data.user.name);
    })
    .catch((err) => {
      console.log("Auth error:", err);
      navigate("/login");
    });
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white">

      {/* Sidebar */}
      <AdminSidebar active={sidebarOpen} toggleSidebar={toggleSidebar} />

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

export default Adminlayout;