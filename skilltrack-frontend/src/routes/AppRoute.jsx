import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ProgressTracker from "../pages/ProgressTracker";
import ConsistencyTracker from "../pages/ConsistencyTracker";
import CompletedSkills from "../pages/CompletedSkills";
import MySkills from "../pages/MySkills";
import Profile from "../pages/Profile";
import AddSkill from "../pages/AddSkills";
import SkillAnalytics from "../pages/SkillAnalytics";
import FrontendRoadmap from "../pages/FrontendRoadmap";
import BackendRoadmap from "../pages/BackendRoadmap";
import DevopsRoadmap from "../pages/DevopsRoadmap";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>

        {/* Dashboard Layout Routes */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/employeeDashboard"
            element={<EmployeeDashboard />}
          />

          <Route
           path="/MySkills"
           element={<MySkills/>}
           />

           <Route
           path="/addSkill"
           element={<AddSkill/>}
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
            path="/analytics"
            element={<SkillAnalytics/>}
            />

            <Route
            path="roadmap/frontend"
            element={<FrontendRoadmap/>}/>

            <Route
            path="roadmap/backend"
            element={<BackendRoadmap/>}/>

            <Route
            path="roadmap/devops"
            element={<DevopsRoadmap/>}
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