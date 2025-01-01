import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import DataTable from "react-data-table-component";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import EditEmployee from "./EditEmployee";
import ViewEmployee from "./ViewEmployee";
import { Drawer } from "@mui/material";

const List = () => {
  // Mock employee data
  const mockEmployees = [
    { _id: "1", fullname: "John Doe", designation: "Software Engineer", workEmail: "ali@trackpro.com", dept: "Engineering", phoneNo: "03232566196" },
    { _id: "2", fullname: "Jane Smith", designation: "Product Manager", workEmail: "ali@trackpro.com", dept: "Product", phoneNo: "03232566196" },
    { _id: "3", fullname: "John Doe", designation: "Software Engineer", workEmail: "ali@trackpro.com", dept: "Engineering", phoneNo: "03232566196" },
    { _id: "4", fullname: "Jane Smith", designation: "Product Manager", workEmail: "ali@trackpro.com", dept: "Product", phoneNo: "03232566196" },
    { _id: "5", fullname: "John Doe", designation: "Software Engineer", workEmail: "ali@trackpro.com", dept: "Engineering", phoneNo: "03232566196" },
    { _id: "6", fullname: "Jane Smith", designation: "Product Manager", workEmail: "ali@trackpro.com", dept: "Product", phoneNo: "03232566196" },
  ];

  const [employees, setEmployees] = useState(mockEmployees);
  const [search, setSearch] = useState("");
  const [dropdowns, setDropdowns] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

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

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenDrawer(true);
  };

  const handleSaveEdit = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp._id === updatedEmployee._id ? updatedEmployee : emp
      )
    );
    setOpenDrawer(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((employee) => employee._id !== id));
    }
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
      name: "Phone No.",
      selector: (row) => row.phoneNo,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
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
                  <Link
                    to={`/admin-dashboard/view-employee/${row._id}`} // Updated to navigate to Employee Details
                    className="flex item-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaEye className="w-4 h-4 text-gray-600 mr-2" /> View
                  </Link>
                  <button
                    onClick={() => handleEdit(row)} 
                    className="flex item-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaPen className="w-4 h-4 text-gray-600 mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="flex item-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FaTrash className="w-4 h-4 text-red-600 mr-2" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Employees List</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-red-500 hover:bg-red-700 rounded text-white"
        >
          Add New Employee
        </Link>
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
        {selectedEmployee && (
          <EditEmployee
            employee={selectedEmployee}
            onClose={() => setOpenDrawer(false)}
            onSave={handleSaveEdit}
          />
        )}
      </Drawer>
    </div>
  );
};

export default List;
