import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");
  const [commentFiles, setCommentFiles] = useState([]);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(1);
  const [members, setMembers] = useState([]); // Added members state for dropdown

  useEffect(() => {
    // Fetch tasks from the backend API
    axios
      .get("/api/v1/teamlead/gettasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        const { data, success } = response.data;

        if (success && Array.isArray(data)) {
          // Map API response to the expected format
          const formattedTasks = data.map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            priority: task.priority.replace("Priority", ""), // Adjust "mediumPriority" to "Medium"
            status:
              task.status === "TODO"
                ? "To Do"
                : task.status === "IN_PROGRESS"
                ? "In Progress"
                : task.status === "COMPLETED"
                ? "Completed"
                : task.status === "EVALUATED"
                ? "Evaluated"
                : task.status, // Map uppercase to readable format
            deadline: task.deadline,
            department: task.department || "",
            tasktype: task.tasktype || "",
            comments: [], // Add default empty comments array
            rating: null, // Add default null rating
            files: [], // Add default empty files array
          }));

          setTasks(formattedTasks);
        } else {
          console.error("Invalid tasks format:", response.data);
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Handle API errors gracefully
      });

    // Fetch team members for the dropdown
    
      // Fetch team members for the dropdown
      axios
        .get("/api/v1/teamlead/getmembers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          const { data, success } = response.data;
    
          if (success && Array.isArray(data)) {
            // Format and set members
            const formattedMembers = data.map((member) => ({
              name: typeof member.name === "string" ? member.name : "Unnamed Member",
            }));
            setMembers(formattedMembers);
          } else {
            console.error("Invalid members format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching members:", error);
        });
  }, []);
    

  const statuses = ["To Do", "In Progress", "Completed", "Evaluated"];

  const onDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const onDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
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
        author: "Current User",
        timestamp: new Date().toISOString(),
        files: commentFiles.map((file) => file.name),
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
    if (!selectedTask.assignedTo) {
      alert("Please assign a team member before saving.");
      return;
    }
  
    const assignedMember = members.find((member) => member.name === selectedTask.assignedTo);
  
    if (!assignedMember) {
      alert("Invalid member selection. Please select a valid member.");
      return;
    }
  
    const payload = {
      taskId: selectedTask.id,
      memberId: assignedMember._id,
      status: "In Progress",
    };
  
    axios
      .post("/api/v1/teamlead/updatetask", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          alert("Task updated successfully!");
          const updatedTask = { ...selectedTask, status: "In Progress" };
          setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
          closePopup();
        } else {
          alert("Failed to update task. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert("An error occurred while updating the task.");
      });
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
      status: "Evaluated",
      rating: ratingValue,
    };

    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
    setRatingModalVisible(false);
  };

  return (
    <div className="kanban-board">
      {statuses.map((status) => (
        <div
          key={status}
          className="kanban-column"
          onDrop={(e) => onDrop(e, status)}
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
                {task.rating && <div className="task-rating">Rating: {task.rating}</div>}
              </div>
            ))}
        </div>
      ))}

      {/* Selected Task Popup */}
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
                  onChange={(e) => {
                    const updatedTask = { ...selectedTask, status: e.target.value };
                    setSelectedTask(updatedTask);
                    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
                  }}
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
                  value={selectedTask.assignedTo || ""}
                  onChange={(e) => {
                    const updatedTask = { ...selectedTask, assignedTo: e.target.value };
                    setSelectedTask(updatedTask);
                    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
                  }}
                  className="dropdown"
                >
                  <option value="">Select a member</option>
                  {members.map((member) => (
                    <option key={member._id} value={member.name}>
                      {member.name}
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
                      <p>
                        <strong>{comment.author}</strong> - {new Date(comment.timestamp).toLocaleString()}
                      </p>
                      <p>{comment.text}</p>
                      {comment.files.length > 0 && (
                        <ul className="comment-files">
                          {comment.files.map((file, idx) => (
                            <li key={idx}>
                              <a href={`#${file}`} download>
                                {file}
                              </a>
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
