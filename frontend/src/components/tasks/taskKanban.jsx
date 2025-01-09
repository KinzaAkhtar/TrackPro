import React, { useState } from "react";
import "./KanbanBoard.css";

const onDragStart = (e, task) => {
  e.dataTransfer.setData("taskId", task.id);
};

const onDrop = (e, status, tasks, setTasks) => {
  const taskId = e.dataTransfer.getData("taskId");
  const updatedTasks = tasks.map((task) =>
    task.id === parseInt(taskId) ? { ...task, status } : task
  );
  setTasks(updatedTasks);
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Wireframes",
      description: "Create initial wireframes for the homepage.",
      assignedBy: "John Doe",
      deadline: "2025-01-10",
      status: "To Do",
      labels: ["Urgent"],
      files: ["wireframes.zip", "homepage-sketch.png"],
    },
    {
      id: 2,
      title: "Develop API",
      description: "Develop RESTful APIs for the backend.",
      assignedBy: "Jane Smith",
      deadline: "2025-01-15",
      status: "In Progress",
      labels: ["Pending"],
      files: ["api-docs.pdf", "auth-module.js"],
    },
  ]);

  const statuses = ["To Do", "In Progress", "Completed", "Evaluated"];
  const labels = ["Pending", "Urgent", "Blocked"];

  const [selectedTask, setSelectedTask] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [isReturningTask, setIsReturningTask] = useState(false);
  const [comment, setComment] = useState("");

  const addLabel = (label) => {
    const updatedTask = {
      ...selectedTask,
      labels: [label], // only allow one label at a time
    };
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
  };

  const updateTaskStatus = (status) => {
    const updatedTask = { ...selectedTask, status };
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
  };

  const closePopup = () => {
    setSelectedTask(null);
    setIsReturningTask(false);
    setReturnReason("");
    setComment("");
  };

  const sendReturnReason = () => {
    alert(`Return reason sent: ${returnReason}`);
    setReturnReason(""); // Reset after sending
  };

  return (
    <div className="kanban-board">
      {statuses.map((status) => (
        <div
          key={status}
          className="kanban-column"
          onDrop={(e) => onDrop(e, status, tasks, setTasks)}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3 className="column-header">{status}</h3>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <div
                key={task.id}
                className={`kanban-task ${task.status.toLowerCase().replace(" ", "-")}`}
                draggable
                onDragStart={(e) => onDragStart(e, task)}
                onClick={() => setSelectedTask(task)}
              >
                <div className="task-title">{task.title}</div>
                <div className="task-labels">
                  {task.labels.map((label, index) => (
                    <span key={index} className={`task-label ${label.toLowerCase()}`}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ))}

      {selectedTask && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>{selectedTask.title}</h2>
              <button className="close-button" onClick={closePopup}>
                ✖
              </button>
            </div>
            <div className="popup-content">
              <div className="left-section">
                <h4>Description</h4>
                <p>{selectedTask.description}</p>

                <h4>Attached Files</h4>
                <ul className="file-list">
                  {selectedTask.files.map((file, index) => (
                    <li key={index}>
                      <a href={`#${file}`} download>
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>

                <h4>Labels</h4>
                <select
                  onChange={(e) => addLabel(e.target.value)}
                  className="dropdown"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Add a label
                  </option>
                  {labels.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>

                <h4>Return Task</h4>
                <div className="return-task-section">
                  <input
                    type="checkbox"
                    id="returnTask"
                    checked={isReturningTask}
                    onChange={(e) => setIsReturningTask(e.target.checked)}
                  />
                  <label htmlFor="returnTask">Check to return task</label>
                  {isReturningTask && (
                    <>
                      <textarea
                        placeholder="Reason for returning..."
                        value={returnReason}
                        onChange={(e) => setReturnReason(e.target.value)}
                        className="comment-input"
                      ></textarea>
                      <button className="return-button" onClick={sendReturnReason}>
                        Send Reason
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="right-section">
                <h4>Assigned By</h4>
                <p>{selectedTask.assignedBy}</p>

                <h4>Deadline</h4>
                <p>{selectedTask.deadline}</p>

                <h4>Comments</h4>
                <textarea
                  placeholder="Write a comment for the team lead..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="comment-input"
                ></textarea>
                <button
                  className="return-button"
                  onClick={() => {
                    alert("Comment sent to the team lead!");
                    setComment("");
                  }}
                >
                  Send
                </button>

                <h4>Status</h4>
                <select
                  value={selectedTask.status}
                  onChange={(e) => updateTaskStatus(e.target.value)}
                  className="dropdown"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
