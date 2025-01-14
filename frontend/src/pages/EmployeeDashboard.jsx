import React from "react";
import EmployeeSidebar from "../components/dashboard/employeeSidebar";
import Navbar from "../components/dashboard/Navbar";
// import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";
const EmployeeDashboard = () => {
    return(
        <div className="flex">
            <EmployeeSidebar/>
            <div className="flex-1 ml-64 bg-white-100 h-screen">
            <Navbar/>
            <Outlet/>
            </div>
        </div>
    )
}
export default EmployeeDashboard