import React, { useState } from "react";

const DistributeTask = ({ task, employees, onClose, onSave }) => {
  const [assignedEmployee, setAssignedEmployee] = useState("");

  const handleAssignTask = () => {
    if (!assignedEmployee) {
      alert("Please select an employee to assign the task.");
      return;
    }

    const updatedTask = {
      ...task,
      assignedTo: assignedEmployee,
      status: "Assigned",
    };

    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Distribute Task</h2>
      <p className="mb-2">
        <strong>Task:</strong> {task.taskName}
      </p>
      <p className="mb-4">
        <strong>Due Date:</strong> {task.dueDate}
      </p>

      <div className="mb-4">
        <label htmlFor="employee" className="block mb-2">
          Select Employee to Assign:
        </label>
        <select
          id="employee"
          value={assignedEmployee}
          onChange={(e) => setAssignedEmployee(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">-- Select Employee --</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee.fullname}>
              {employee.fullname} ({employee.designation})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 mr-2 text-gray-600 border border-gray-400 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleAssignTask}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Assign Task
        </button>
      </div>
    </div>
  );
};

export default DistributeTask;
