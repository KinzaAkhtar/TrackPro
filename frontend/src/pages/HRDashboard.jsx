import React from "react";
import HRSidebar from "../components/dashboard/HRSidebar";
import Navbar from "../components/dashboard/Navbar";
// import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";
const HRDashboard = () => {
    return(
        <div className="flex">
            <HRSidebar/>
            <div className="flex-1 ml-64 bg-white-100 h-screen">
            <Navbar/>
            <Outlet/>
            </div>
        </div>
    )
}
export default HRDashboard