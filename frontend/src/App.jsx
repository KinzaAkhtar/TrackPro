import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import List from "./components/employee/List"
import PrivateRoutes from "./utils/PrivateRoutes"
import RoleBaseRoutes from "./utils/RoleBaseRoutes"
import AdminSummary from "./components/dashboard/AdminSummary"
import Add from "./components/employee/Add"
import EditEmployee from "./components/employee/EditEmployee"
import ViewEmployee from "./components/employee/ViewEmployee"
import AttendanceManag from "./components/attendmanage/AttendanceManag"
import Payroll from "./components/payroll/Payroll"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin-dashboard" element={
          //<PrivateRoutes>
            //<RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard/>
            //</Routes></RoleBaseRoutes>
          //</PrivateRoutes>
        }>
          <Route index element={<AdminSummary/>}></Route>
          <Route path="/admin-dashboard/employee" element={<List/>}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
          <Route path="/admin-dashboard/edit-employee/:id" element={<EditEmployee/>}></Route>
          <Route path="/admin-dashboard/view-employee/:id" element={<ViewEmployee/>}></Route>
          <Route path="/admin-dashboard/attend-manage" element={<AttendanceManag/>}></Route>
          <Route path="/admin-dashboard/payroll" element={<Payroll/>}></Route>
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
