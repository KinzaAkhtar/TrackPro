import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaTasks, FaEye, FaPen } from "react-icons/fa";
import { Drawer } from "@mui/material";
import DistributeTask from "./DistributeTask"; // Component to handle task distribution
// import ViewEmployee from "./ViewEmployee"; // Component to view employee details

const TeamManagementTL = () => {
  // Mock data for employees under the team lead
  const mockEmployees = [
    { _id: "1", fullname: "John Doe", designation: "Software Engineer", workEmail: "john@example.com", dept: "Engineering", phoneNo: "03232566196" },
    { _id: "2", fullname: "Jane Smith", designation: "UI/UX Designer", workEmail: "jane@example.com", dept: "Design", phoneNo: "03232566197" },
  ];

  // Mock data for tasks assigned by admin to the team lead
  const mockTasks = [
    { taskId: "T101", taskName: "Develop Login Page", dueDate: "2025-01-15", status: "Pending" },
    { taskId: "T102", taskName: "Create Dashboard UI", dueDate: "2025-01-20", status: "In Progress" },
  ];

  const [employees, setEmployees] = useState(mockEmployees);
  const [tasks, setTasks] = useState(mockTasks);
  const [search, setSearch] = useState("");
  const [dropdowns, setDropdowns] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // Task to distribute

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = (id) => {
    setDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDistributeTask = (task) => {
    setSelectedTask(task);
    setOpenDrawer(true);
  };

  const handleSaveTaskDistribution = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    );
    setOpenDrawer(false);
  };

  const columns = [
    {
      name: "Employee ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "Work Email",
      selector: (row) => row.workEmail,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.dept,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="relative">
          <button
            onClick={() => toggleDropdown(row._id)}
            className="px-2 py-1 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="6" r="1" />
              <circle cx="12" cy="18" r="1" />
            </svg>
          </button>
          {dropdowns[row._id] && (
            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => alert(`Viewing profile of ${row.fullname}`)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaEye className="w-4 h-4 text-gray-600 mr-2" /> View
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Team Management</h3>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Assigned Tasks</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Task ID</th>
                <th className="px-4 py-2 border">Task Name</th>
                <th className="px-4 py-2 border">Due Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.taskId}>
                  <td className="px-4 py-2 border">{task.taskId}</td>
                  <td className="px-4 py-2 border">{task.taskName}</td>
                  <td className="px-4 py-2 border">{task.dueDate}</td>
                  <td className="px-4 py-2 border">{task.status}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDistributeTask(task)}
                      className="text-blue-600 hover:underline"
                    >
                      Distribute
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Name"
          className="px-4 py-0.5 border"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination={true}
        highlightOnHover={true}
        responsive={true}
      />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          style: { width: "400px", backgroundColor: "#f9fafb" },
        }}
      >
        {selectedTask && (
          <DistributeTask
            task={selectedTask}
            employees={employees}
            onClose={() => setOpenDrawer(false)}
            onSave={handleSaveTaskDistribution}
          />
        )}
      </Drawer>
    </div>
  );
};

export default TeamManagementTL;
