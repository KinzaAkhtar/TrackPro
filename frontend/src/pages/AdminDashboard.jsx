// AdminDashboard.js
import React, { useState } from "react";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom"; // Used to render child components

const AdminDashboard = () => {
  
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-white-100 h-screen">
        <Navbar />
        <div className="p-4">
          {/* Pass setEmployeeCount to child components */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
