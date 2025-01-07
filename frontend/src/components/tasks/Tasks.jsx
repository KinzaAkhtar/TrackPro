// File: src/App.jsx
import React from "react";
// import TaskCards from "./TaskCards";
// import TaskKanban from "./TaskKanban";

// import EmployeeSidebar from "../components/dashboard/employeeSidebar";

// import { Navigate } from "react-router-dom";


const Tasks = () => {
  return (
    <div className="flex">
            <EmployeeSidebar/>
      {/* <header className="bg-gray-800 text-white text-center p-4">
        <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
      </header> */}

      <div className="bg-white-100 min-h-screen">
        <TaskCards />
        {/* <div className="bg-white-100 min-h-screen"> */}
          <TaskKanban/>

        </div>
        <Outlet/>
      </div>
    // </div>
  );
};

export default Tasks;
