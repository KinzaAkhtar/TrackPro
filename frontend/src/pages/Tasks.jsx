
import React from "react";
import TaskCards from "../components/tasks/TaskCards";
import TaskKanban from "../components/tasks/TaskKanban";
import { Outlet } from "react-router-dom";

import TLSidebar from "../components/dashboard/TLSidebar";

import { Navigate } from "react-router-dom";


const Tasks = () => {
  return (
    <div className="flex">
            <TLSidebar/>
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
