import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ProgressTracker from "../pages/ProgressTracker";
import ConsistencyTracker from "../pages/ConsistencyTracker";
import CompletedSkills from "../pages/CompletedSkills";
import Profile from "../pages/Profile"


import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Layout Routes */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/employeeDashboard"
            element={<EmployeeDashboard />}
          />

          <Route
            path="/progress"
            element={<ProgressTracker />}
          />

          <Route
            path="consistency"
            element={<ConsistencyTracker/>}
            />

            <Route
            path="completed"
            element={<CompletedSkills/>}
            />

            <Route 
            path="profile"
            element={<Profile/>}/>

        </Route>

      </Routes>

    </BrowserRouter>

  );
};

export default AppRoutes;