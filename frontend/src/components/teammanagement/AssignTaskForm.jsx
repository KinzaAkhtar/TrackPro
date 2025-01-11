import React, { useState } from "react";
import styles from "./TaskManagement.module.css";

const AssignTaskForm = ({ team, assignTask }) => {
  const [taskDetails, setTaskDetails] = useState({
    employeeId: "",
    instructions: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTaskDetails((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    assignTask(taskDetails);
  };

  return (
    <form className={styles.assignForm} onSubmit={handleSubmit}>
      <h2>Assign Task</h2>
      <select name="employeeId" onChange={handleChange} required>
        <option value="">Select Employee</option>
        {team.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
      <textarea
        name="instructions"
        placeholder="Task Instructions"
        onChange={handleChange}
        required
      />
      <input type="file" name="file" onChange={handleFileChange} />
      <button type="submit">Assign</button>
    </form>
  );
};

export default AssignTaskForm;
