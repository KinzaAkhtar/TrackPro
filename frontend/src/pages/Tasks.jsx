<<<<<<< HEAD
=======
// File: src/App.jsx
>>>>>>> 501179538b1d0cd2c8180055bef388bcb0ad9acc
import React from "react";
import TaskCards from "../components/tasks/TaskCards";
import TaskKanban from "../components/tasks/TaskKanban";
import { Outlet } from "react-router-dom";

<<<<<<< HEAD
const Tasks = () => {
  return (
    <div className="bg-white-100 min-h-screen">
      <TaskCards />
      <div className="bg-white-100 min-h-screen">
        <TaskKanban />
        <Outlet />
      </div>
    </div>
=======
import EmployeeSidebar from "../components/dashboard/employeeSidebar";

import { Navigate } from "react-router-dom";


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
>>>>>>> 501179538b1d0cd2c8180055bef388bcb0ad9acc
  );
};

export default Tasks;
