import React from "react";
import styles from "./TaskManagement.module.css";

const TaskList = ({ tasks }) => (
  <div className={styles.taskList}>
    <h2>Assigned Tasks</h2>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.title}</span>
          <span>Deadline: {task.deadline}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskList;
