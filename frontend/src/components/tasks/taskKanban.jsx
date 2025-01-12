import React, { useState } from "react";
import "./KanbanBoard.css";

// The onDragStart and onDrop functions remain unchanged
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
      comments: [],
      rating: null, // Add a field for rating
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
      comments: [],
      rating: null,
    },
  ]);

  const statuses = ["To Do", "In Progress", "Completed", "Evaluated"];
  const members = ["John", "Doe", "Sammy", "Bryan"];

  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");
  const [commentFiles, setCommentFiles] = useState([]);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(1); // Rating state (1 to 5)

  const updateTaskStatus = (status) => {
    const updatedTask = { ...selectedTask, status };
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
  };

  const closePopup = () => {
    setSelectedTask(null);
    setComment("");
    setCommentFiles([]);
  };

  const addComment = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        author: "Current User", // Replace with dynamic user
        timestamp: new Date().toISOString(),
        files: commentFiles,
      };
      
      const updatedTask = {
        ...selectedTask,
        comments: [...selectedTask.comments, newComment],
      };
      
      setTasks(tasks.map((task) => (task.id === selectedTask.id ? updatedTask : task)));
      setSelectedTask(updatedTask);
      setComment("");
      setCommentFiles([]);
    }
  };

  const handleFileChange = (e) => {
    setCommentFiles([...commentFiles, ...Array.from(e.target.files)]);
  };

  const saveChanges = () => {
    alert("Changes saved!");
    closePopup(); // Close the modal after saving
  };

  const openRatingModal = () => {
    setRatingModalVisible(true);
  };

  const closeRatingModal = () => {
    setRatingModalVisible(false);
  };

  const submitRating = () => {
    const updatedTask = {
      ...selectedTask,
      status: "Evaluated",  // Set the task status to 'Evaluated'
      rating: ratingValue,  // Save the selected rating
    };
  
    // Update the tasks state with the updated task
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask); // Update the selected task to reflect the new status and rating
    setRatingModalVisible(false); // Close the rating modal
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
                draggable={task.status !== "Evaluated"}
                onDragStart={(e) => onDragStart(e, task)}
                onClick={() => setSelectedTask(task)}
              >
                <div className="task-title">{task.title}</div>
                {task.rating && (
                  <div className="task-rating">
                    Rating: {task.rating}
                  </div>
                )}
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

                <h4>Deadline</h4>
                <p>{selectedTask.deadline}</p>

                <h4>Status</h4>
                <select
                  value={selectedTask.status}
                  onChange={(e) => updateTaskStatus(e.target.value)}
                  className="dropdown"
                  disabled={selectedTask.status === "Evaluated"}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {selectedTask.rating && (
                <div className="task-rating">
                  <h4>Rating</h4>
                  <p>{selectedTask.rating}</p>
                </div>
              )}


                <h4>Assigned To</h4>
                <select
                  value={selectedTask.assignedTo}
                  onChange={(e) => {
                    const updatedTask = { ...selectedTask, assignedTo: e.target.value };
                    setSelectedTask(updatedTask);
                    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
                  }}
                  className="dropdown"
                >
                  {members.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>

                {/* Only show Evaluate button if status is 'Completed' */}
                {selectedTask.status === "Completed" && (
                  <button className="evaluate-button" onClick={openRatingModal}>
                    Evaluate
                  </button>
                )}
              </div>

              <div className="right-section">
                <h4>Comments</h4>
                <div className="comments-section">
                  {selectedTask.comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <p><strong>{comment.author}</strong> - {new Date(comment.timestamp).toLocaleString()}</p>
                      <p>{comment.text}</p>
                      {comment.files.length > 0 && (
                        <ul className="comment-files">
                          {comment.files.map((file, idx) => (
                            <li key={idx}>
                              <a href={`#${file.name}`} download>{file.name}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                <textarea
                  placeholder="Write a comment for the team lead..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="comment-input"
                ></textarea>

                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="comment-file-input"
                />

                <button className="return-button" onClick={addComment}>
                  Add Comment
                </button>
              </div>
            </div>
            <button className="save-changes-button" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {ratingModalVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>Rate this Task</h2>
              <button className="close-button" onClick={closeRatingModal}>
                ✖
              </button>
            </div>
            <div className="popup-content">
              <h4>Select a rating (1 to 5):</h4>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    className={`rating-button ${value === ratingValue ? "selected" : ""}`}
                    onClick={() => setRatingValue(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <button className="save-rating-button" onClick={submitRating}>
                Save Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
