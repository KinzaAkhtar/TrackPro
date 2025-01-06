import React, { useState } from "react";

// Function to handle drag start
const onDragStart = (e, task) => {
  e.dataTransfer.setData("taskId", task.id);
};

// Function to handle drop
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
      assignedAt: "2025-01-01",
      deadline: "2025-01-10",
      requiredFiles: "Wireframe_Sketch.pdf",
      instructions: "Use Figma for design. Ensure all sections are responsive.",
      status: "To Do",
      labels: [],
    },
    {
      id: 2,
      title: "Develop API",
      description: "Develop RESTful APIs for the backend.",
      assignedBy: "Jane Smith",
      assignedAt: "2025-01-02",
      deadline: "2025-01-15",
      requiredFiles: "API_Specification.doc",
      instructions: "Use Node.js and ensure proper testing.",
      status: "In Progress",
      labels: [],
    },
    {
      id: 3,
      title: "Write Documentation",
      description: "Write user manuals and technical documentation.",
      assignedBy: "Alice Johnson",
      assignedAt: "2025-01-05",
      deadline: "2025-01-20",
      requiredFiles: "Technical_Docs.png",
      instructions: "Follow the company’s documentation template.",
      status: "Completed",
      labels: [],
    },
  ]);

  const statuses = ["To Do", "In Progress", "Completed"];
  const labels = ["Pending", "Urgent", "Blocked"];

  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");
  const [returnReason, setReturnReason] = useState(null);
  const [file, setFile] = useState(null); // Track the selected file

  const getTaskStyle = (status) => {
    switch (status) {
      case "To Do":
        return { backgroundColor: "#f5b3b5" };
      case "In Progress":
        return { backgroundColor: "#ffec99" };
      case "Completed":
        return { backgroundColor: "#d4edda" };
      default:
        return { backgroundColor: "#fff" };
    }
  };

  const updateTaskStatus = (status) => {
    const updatedTask = { ...selectedTask, status };
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
  };

  const addLabel = (label) => {
    const updatedTask = {
      ...selectedTask,
      labels: [...new Set([...selectedTask.labels, label])],
    };
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(updatedTask);
  };

  const handleReturnTask = () => {
    alert(`Task returned to team lead. Reason: ${returnReason}`);
    setReturnReason(null);
    closePopup();
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      alert(`You selected: ${selectedFile.name}`);
    }
  };

  return (
    <div style={styles.kanbanBoard}>
      {statuses.map((status) => (
        <div
          key={status}
          style={styles.kanbanColumn}
          onDrop={(e) => onDrop(e, status, tasks, setTasks)}
          onDragOver={(e) => e.preventDefault()} // Allow dropping
        >
          <h3 style={styles.columnHeader}>{status}</h3>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <div
                key={task.id}
                style={{ ...styles.kanbanTask, ...getTaskStyle(task.status) }}
                onClick={() => setSelectedTask(task)}
                draggable
                onDragStart={(e) => onDragStart(e, task)}
              >
                {task.title}
              </div>
            ))}
        </div>
      ))}

      {selectedTask && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            {/* Left Section */}
            <div style={styles.leftSection}>
              <h2 style={styles.popupHeader}>{selectedTask.title}</h2>
              <h2 style={styles.boldText}>Description</h2>
              <p>{selectedTask.description}</p>

              <h2 style={styles.boldText}>Attachment</h2>
              <div style={styles.addAttachmentButtonContainer}>
                <button
                  style={styles.addAttachmentButton}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  +
                </button>
                <input
                  type="file"
                  id="fileInput"
                  style={styles.hiddenFileInput}
                  onChange={handleFileChange}
                />
              </div>
              {file && (
                <p style={styles.fileName}>{file.name}</p> // Display selected file name
              )}

              <h2 style={styles.boldText}>Comments</h2>
              <textarea
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button style={styles.sendButton}>Send</button>
            </div>

            {/* Right Section */}
            <div style={styles.rightSection}>
              <div>
                <label><strong>Status:</strong></label>
                <select
                  value={selectedTask.status}
                  onChange={(e) => updateTaskStatus(e.target.value)}
                  style={styles.dropdown}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label><strong>Labels:</strong></label>
                <select
                  onChange={(e) => addLabel(e.target.value)}
                  style={styles.dropdown}
                >
                  <option value="">Add a label</option>
                  {labels.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
                <div style={styles.labelContainer}>
                  {selectedTask.labels.map((label, index) => (
                    <span key={index} style={styles.label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.infoCardsContainer}>
                <div style={styles.infoCard}>
                <h3 style={styles.cardHeader}>Assigned By</h3>
                <div style={styles.cardBox}>
                <p style={styles.cardContent}>{selectedTask.assignedBy}</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <h3 style={styles.cardHeader}>Deadline</h3>
                <div style={styles.cardBox}>
                <p style={styles.cardContent}>{selectedTask.deadline}</p>
              </div>
            </div>
            </div>



              <div>
                <label><strong>Return Task:</strong></label>
                <input
                  type="checkbox"
                  onChange={(e) => setReturnReason(e.target.checked ? "" : null)}
                />
                {returnReason !== null && (
                  <>
                    <textarea
                      style={styles.commentInput}
                      placeholder="Reason for returning..."
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                    ></textarea>
                    <button
                      style={styles.returnButton}
                      onClick={handleReturnTask}
                    >
                      Send
                    </button>
                  </>
                )}
              </div>
            </div>

            <button style={styles.closeButton} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  kanbanBoard: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px", // Increased padding
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  columnHeader: {
    textAlign: "center",
    marginBottom: "20px", // Increased space
  },
  kanbanTask: {
    padding: "20px", // Increased padding
    marginBottom: "15px", // Increased margin
    backgroundColor: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  popupOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    background: "#fff",
    padding: "30px", // Increased padding
    borderRadius: "8px",
    width: "70%", // Increased width
    height: "90%", // Increased height
    display: "flex",
    gap: "40px", // Increased gap
  },
  leftSection: {
    flex: 1,
    borderRight: "1px solid #ccc",
    paddingRight: "30px", // Increased padding
  },
  rightSection: {
    flex: 1,
    paddingLeft: "30px", // Increased padding
  },
  popupHeader: {
    fontSize: "24px", // Increased font size
    fontWeight: "bold",
    marginBottom: "20px", // Added margin
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: "10px", // Increased margin
  },
  commentInput: {
    width: "100%",
    padding: "15px", // Increased padding
    marginBottom: "15px", // Increased margin
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  dropdown: {
    width: "100%",
    padding: "12px", // Increased padding
    marginBottom: "15px", // Increased margin
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  labelContainer: {
    marginTop: "15px", // Increased margin
  },
  label: {
    display: "inline-block",
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    marginRight: "10px", // Increased margin
  },
  addAttachmentButtonContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: "15px", // Increased margin
  },
  addAttachmentButton: {
    fontSize: "28px", // Increased font size
    width: "60px",    // Increased size
    height: "60px",   // Increased size
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    position: "absolute",
    right: "0", // Positioned to the right
    top: "50%",
    transform: "translateY(-50%)",
  },
  hiddenFileInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  sendButton: {
    padding: "12px 18px", // Increased padding
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "4px", // Increased margin
  },
  returnButton: {
    padding: "12px 20px", // Increased padding
    backgroundColor: "#ff4d4f",
    color: "#fff",
    borderRadius: "4px",
    marginTop: "20px", // Increased margin
  },
  closeButton: {
    padding: "12px 20px", // Increased padding
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    alignSelf: "flex-end",
    marginTop: "22px", // Increased margin
  },
  fileName: {
    marginTop: "10px", // Added margin
    fontSize: "14px",
    color: "#555",
  },
  infoCardsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px", // Space between this section and others
  },
  infoCard: {
    flex: 1,
    padding: "8px 0", // Space between heading and box
  },
  cardHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
    textAlign: "left", // Align header to the left
  },
  cardBox: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center", // Center content in the box
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
    wordBreak: "break-word", // Ensure long content wraps
  },
};

export default KanbanBoard;
