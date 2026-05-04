import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import UserLayout from "./layout/UserLayout";
import Protected from "./component/Protectedroutes";
import Userdashboard from "./pages/Userdashboard";
import Usertasks from "./pages/usertask";
import AdminLayout from "./layout/Adminlayout";
import AdminDashboard from "./pages/AdminDashboard";
import AllProject from "./pages/AllProject";
import Createproject from "./pages/Createproject";
import CreateTask from "./pages/Createtask";
import Settings from "./pages/Settings";




function App() {
  return (
    <Router>
      <Routes>

        {/* 🔓 Public */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected */}
        <Route
          path="/user"
          element={
            <Protected>
              <UserLayout />
            </Protected>
          }
        >
          {/* 👉 default dashboard */}
          <Route index element={<Userdashboard />} />

          <Route path="tasks" element={<Usertasks />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/admin"
          element={
            <Protected>
              <AdminLayout />
            </Protected>
          }
        >
          {/* 👉 default dashboard */}
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AllProject />} />
          <Route path="create-project" element={<Createproject />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="settings" element={<Settings />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
