// AdminDashboard.js
import React, { useState } from "react";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom"; // Used to render child components

const AdminDashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0); // Initialize state for employee count
  console.log("Employee Count in AdminDashboard:", employeeCount);
  const [employees, setEmployees] = useState([]); // Array to store employee data

  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
    setEmployeeCount((prevCount) => prevCount + 1);
  };
  
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-white-100 h-screen">
        <Navbar />
        <div className="p-4">
          {/* Pass setEmployeeCount to child components */}
          <Outlet context={{ employeeCount, setEmployeeCount }} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
