import React from "react";
import TLSidebar from "../components/dashboard/TLSidebar";
import Navbar from "../components/dashboard/Navbar";
// import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";
// import EmployeeSidebar from "../components/dashboard/employeeSidebar";
const TLDashboard = () => {
    return(
        <div className="flex">
            <TLSidebar/>
            <div className="flex-1 ml-64 bg-white-100 h-screen">
            <Navbar/>
            <Outlet/>
            </div>
        </div>
    )
}
export default TLDashboard