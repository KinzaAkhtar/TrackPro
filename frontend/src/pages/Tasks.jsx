import React from "react";
import TaskCards from "../components/tasks/TaskCards";
import TaskKanban from "../components/tasks/TaskKanban";
import { Outlet } from "react-router-dom";

const Tasks = () => {
  return (
    <div className="bg-white-100 min-h-screen">
      <TaskCards />
      <div className="bg-white-100 min-h-screen">
        <TaskKanban />
        <Outlet />
      </div>
    </div>
  );
};

export default Tasks;
