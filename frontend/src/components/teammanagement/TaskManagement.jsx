import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import TaskList from "./TaskList";
import TeamTable from "./TeamTable";
import AssignTaskForm from "./AssignTaskForm";
import "./TaskManagement.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Homepage", deadline: "2025-01-15" },
    { id: 2, title: "API Integration", deadline: "2025-01-20" },
  ]);

  const [team, setTeam] = useState([
    { id: 1, name: "Alice", availability: "Available", performance: "Excellent", assignedTasks: 2 },
    { id: 2, name: "Bob", availability: "Busy", performance: "Good", assignedTasks: 3 },
  ]);

  const assignTask = (taskDetails) => {
    console.log("Task Assigned:", taskDetails);
  };

  return (
    <div className={styles.appContainer}>
      <Navbar />
      <Sidebar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Task Management</h1>
        </header>
        <section className={styles.contentSection}>
          <TaskList tasks={tasks} />
          <TeamTable team={team} />
          <AssignTaskForm team={team} assignTask={assignTask} />
        </section>
      </div>
    </div>
  );
};

export default TaskManagement;
