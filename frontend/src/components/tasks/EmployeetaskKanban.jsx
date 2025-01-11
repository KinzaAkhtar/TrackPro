import React, { useState } from "react";
import "./EmployeeKanbanBoard.css";

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
      files: ["wireframes.zip", "homepage-sketch.png"],
      comments: [
        { id: 1, text: "Please add a responsive layout.", author: "John Doe", timestamp: "2025-01-08 10:30", files: [] },
        { id: 2, text: "Noted. Working on it.", author: "Jane Smith", timestamp: "2025-01-08 11:00", files: [] },
      ],
    },
    {
      id: 2,
      title: "Develop API",
      description: "Develop RESTful APIs for the backend.",
      assignedBy: "Jane Smith",
      deadline: "2025-01-15",
      status: "In Progress",
      files: ["api-docs.pdf", "auth-module.js"],
      comments: [],
    },
  ]);

  const statuses = ["To Do", "In Progress", "Completed"];
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isReturnChecked, setIsReturnChecked] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [filesToUpload, setFilesToUpload] = useState([]);

  const addComment = () => {
    if (!commentText.trim() && filesToUpload.length === 0) return;

    const newComment = {
      id: selectedTask.comments.length + 1,
      text: commentText,
      author: "You",
      timestamp: new Date().toLocaleString(),
      files: filesToUpload,
    };

    const updatedTask = {
      ...selectedTask,
      comments: [...selectedTask.comments, newComment],
    };

    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
    setCommentText("");
    setFilesToUpload([]);
  };

  const updateTaskStatus = (status) => {
    const updatedTask = { ...selectedTask, status };
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
  };

  const handleReturnChange = () => {
    setIsReturnChecked(!isReturnChecked);
  };

  const handleReturnSubmit = () => {
    if (returnReason.trim()) {
      alert(`Task returned with reason: ${returnReason}`);
      setIsReturnChecked(false);
      setReturnReason("");
    } else {
      alert("Please provide a reason for returning the task.");
    }
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const handleFileChange = (e) => {
    setFilesToUpload(Array.from(e.target.files));
  };

  const saveChanges = () => {
    alert("Changes have been saved successfully!");
    closePopup();
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

                <h4>Assigned By</h4>
                <p>{selectedTask.assignedBy}</p>

                <h4>Deadline</h4>
                <p>{selectedTask.deadline}</p>

                <h4>Return Task</h4>
                <label>
                  <input
                    type="checkbox"
                    checked={isReturnChecked}
                    onChange={handleReturnChange}
                  />
                  Check to return this task
                </label>

                {isReturnChecked && (
                  <div className="return-reason">
                    <h4>Reason for Returning</h4>
                    <textarea
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      placeholder="Enter reason for returning the task"
                    ></textarea>
                    <button onClick={handleReturnSubmit} className="return-submit-button">
                      Send
                    </button>
                  </div>
                )}
              </div>

              <div className="right-section">
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

                <h4>Comments</h4>
                <div className="comments-section">
                  {selectedTask.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <p className="comment-text">{comment.text}</p>
                      <div className="comment-meta">
                        <span className="comment-author">{comment.author}</span> •{" "}
                        <span className="comment-timestamp">{comment.timestamp}</span>
                      </div>
                      {comment.files.length > 0 && (
                        <div className="comment-files">
                          <h5>Attached Files:</h5>
                          <ul>
                            {comment.files.map((file, index) => (
                              <li key={index}>
                                <a href={`#${file.name}`} download>
                                  {file.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="add-comment">
                  <textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="comment-input"
                  ></textarea>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <button onClick={addComment} className="add-comment-button">
                    Add Comment
                  </button>
                </div>
              </div>
            </div>

            <div className="popup-footer">
              <button onClick={saveChanges} className="save-changes-button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
