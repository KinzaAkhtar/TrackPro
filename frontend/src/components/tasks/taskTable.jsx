// File: src/components/TaskTable.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TaskTable = () => {
  const { status } = useParams(); // Extract the status from the URL

  // Normalize the URL parameter for consistent comparison
  const normalizedStatus = status.toLowerCase().replace(/-/g, "");

  const [tasks] = useState([
    {
      id: 1,
      title: "Create Wireframes",
      teamMembers: ["Alice", "Bob"],
      createdAt: "2025-01-01",
      status: "To Do",
      description: "Design wireframes for the new project interface.",
    },
    {
      id: 2,
      title: "Develop API",
      teamMembers: ["Charlie", "Eve"],
      createdAt: "2024-12-30",
      status: "In Progress",
      description: "Develop RESTful APIs for user authentication.",
    },
    {
      id: 3,
      title: "Write Documentation",
      teamMembers: ["Alice"],
      createdAt: "2024-12-29",
      status: "Completed",
      description: "Prepare project documentation for the team.",
    },
  ]);

  // Normalize the task statuses for comparison
  const normalizeStatus = (status) => status.toLowerCase().replace(/\s+/g, "");

  const filteredTasks = tasks.filter(
    (task) => normalizeStatus(task.status) === normalizedStatus
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>{status.replace(/-/g, " ").toUpperCase()} Tasks</h2>
      {filteredTasks.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Task Title</th>
              <th style={thStyle}>Team Members</th>
              <th style={thStyle}>Created At</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id} style={trStyle(index)}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{task.title}</td>
                <td style={tdStyle}>{task.teamMembers.join(", ")}</td>
                <td style={tdStyle}>{task.createdAt}</td>
                <td style={tdStyle}>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found for "{status.replace(/-/g, " ")}"</p>
      )}
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const trStyle = (index) => ({
  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
});

export default TaskTable;
