import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import List from "./components/employee/List";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import EmployeeSummary from "./components/dashboard/EmployeeSummary";
import Add from "./components/employee/Add";
import EditEmployee from "./components/employee/EditEmployee";
import HRDashboard from "./pages/HRDashboard";
import TLDashboard from "./pages/TLDashboard";
import Tasks from "./pages/Tasks";
import ViewEmployee from "./components/employee/ViewEmployee";
import AttendanceManag from "./components/attendmanage/AttendanceManag";
import Payroll from "./components/payroll/Payroll";
import Setting from "./components/Settings/Setting";
import EmployeePayroll from "./components/payroll/EmployeePayroll";
import TeamManagement from "./components/teammanagement/TeamManagement";
import  TLPayroll from "./components/payroll/TLPayroll";
import EmployeeAttendance from "./components/attendmanage/EmployeeAttendance";
import AdminTaskList from "./components/tasks/AdminTaskList";
import CreateTask from "./components/tasks/CreateTask";
import AdminViewTask from "./components/tasks/AdminViewTask"

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />

            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminSummary />} />
              <Route path="/admin-dashboard/employee" element={<List />} />
              <Route path="/admin-dashboard/add-employee" element={<Add />} />
              <Route path="/admin-dashboard/edit-employee/:id" element={<EditEmployee />} />
              <Route path="/admin-dashboard/view-employee/:id" element={<ViewEmployee />} />
              <Route path="/admin-dashboard/attend-manage" element={<AttendanceManag />} />
              <Route path="/admin-dashboard/payroll" element={<Payroll />} />
              <Route path="/admin-dashboard/tasks" element={<AdminTaskList/>}/>
              <Route path="/admin-dashboard/create-task" element={<CreateTask/>}/>
              <Route path="/admin-dashboard/view-task/:id" element={<AdminViewTask />} />
              <Route path="/admin-dashboard/settings" element={<Setting />} />
            </Route>

            {/* Employee Dashboard */}
            <Route path="/employee-dashboard" element={<EmployeeDashboard />}>
              <Route index element={<EmployeeSummary />} />
              <Route path="/employee-dashboard/tasks" element={<Tasks />} />
              <Route path="/employee-dashboard/settings" element={<Setting />} />
              <Route path="/employee-dashboard/payroll" element={<EmployeePayroll />} />
              <Route path="/employee-dashboard/attendance-and-leaves" element={<EmployeeAttendance />} />
            </Route>


            {/* TeamLead Dashboard */}
            <Route path="/tl-dashboard" element={<TLDashboard />}>
              <Route index element={<EmployeeSummary />} />
              <Route path="/tl-dashboard/tasks" element={<Tasks />} />
              <Route path="/tl-dashboard/settings" element={<Setting />} />
              <Route path="/tl-dashboard/payroll" element={<EmployeePayroll />} />
              <Route path="/tl-dashboard/attendance-and-leaves" element={<EmployeeAttendance />} />
            </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
