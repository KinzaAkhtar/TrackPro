import React, { useState } from "react";

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
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [fileError, setFileError] = useState("");

  const statuses = ["To Do", "In Progress", "Completed"];

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task.id === parseInt(id, 10)) {
        task.status = status;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const getTaskStyle = (status) => {
    switch (status) {
      case "To Do":
        return { ...styles.kanbanTask, backgroundColor: "#f5b3b5" };
      case "In Progress":
        return { ...styles.kanbanTask, backgroundColor: "#ffec99" };
      case "Completed":
        return { ...styles.kanbanTask, backgroundColor: "#d4edda" };
      default:
        return styles.kanbanTask;
    }
  };

  const handleTaskClick = (task) => {
    const validExtensions = /\.(png|pdf|doc)$/i;
    if (!validExtensions.test(task.requiredFiles)) {
      setFileError("Required files must be in .png, .pdf, or .doc format.");
      return;
    }
    setFileError("");
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  return (
    <div style={styles.kanbanBoard}>
      {statuses.map((status) => (
        <div
          key={status}
          style={styles.kanbanColumn}
          onDrop={(e) => onDrop(e, status)}
          onDragOver={allowDrop}
        >
          <h3 style={styles.columnHeader}>{status}</h3>
          <div style={styles.kanbanTasks}>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div
                  key={task.id}
                  style={getTaskStyle(task.status)}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  onClick={() => handleTaskClick(task)}
                >
                  {task.title}
                </div>
              ))}
          </div>
        </div>
      ))}

      {fileError && (
        <div style={styles.error}>
          <strong>Error:</strong> {fileError}
        </div>
      )}

      {selectedTask && (
        <div style={styles.popupOverlay} onClick={closePopup}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.popupHeader}>{selectedTask.title}</h2>
            <div style={styles.popupField}>
              <strong>Description:</strong> {selectedTask.description}
            </div>
            <div style={styles.popupField}>
              <strong>Assigned By:</strong> {selectedTask.assignedBy}
            </div>
            <div style={styles.popupField}>
              <strong>Assigned At:</strong> {selectedTask.assignedAt}
            </div>
            <div style={styles.popupField}>
              <strong>Deadline:</strong> {selectedTask.deadline}
            </div>
            <div style={styles.popupField}>
              <strong>Required Files:</strong> {selectedTask.requiredFiles}
            </div>
            <div style={styles.popupField}>
              <strong>Instructions:</strong> {selectedTask.instructions}
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
    borderRadius: "8px",
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  columnHeader: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "18px",
    color: "#333",
  },
  kanbanTasks: {
    minHeight: "100px",
  },
  kanbanTask: {
    color: "#333",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "grab",
    textAlign: "center",
  },
  error: {
    color: "red",
    margin: "10px",
    fontSize: "14px",
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
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "600px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  },
  popupHeader: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    color: "#007bff",
  },
  popupField: {
    marginBottom: "15px",
  },
  closeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    margin: "20px auto 0",
  },
};

export default KanbanBoard;
