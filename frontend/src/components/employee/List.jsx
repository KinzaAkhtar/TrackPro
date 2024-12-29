import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { usePopper } from "react-popper"; // Import Popper hook
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'; // Import the required Font Awesome icons


const List = () => {
  // Mock employee data
  const mockEmployees = [
    { _id: "1", name: "John Doe", designation: "Software Engineer", role:"Admin", department: "Engineering", phoneNo: "03232566196" },
    { _id: "2", name: "Jane Smith", designation: "Product Manager", role:"Admin", department: "Product" , phoneNo: "03232566196" },
    { _id: "3", name: "Sam Johnson", designation: "HR Manager", role:"Employee", department: "HR" , phoneNo: "03232566196" },
    { _id: "4", name: "Robert Brown", designation: "UI/UX Designer", role:"Admin", department: "Design" , phoneNo: "03232566196" },
    { _id: "5", name: "Emily White", designation: "Data Scientist", role:"Admin", department: "Data Science" , phoneNo: "03232566196" },
    { _id: "6", name: "Michael Green", designation: "Frontend Developer", role:"Admin", department: "Engineering" , phoneNo: "03232566196" },
  ];

  const [employees, setEmployees] = useState(mockEmployees);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdowns, setDropdowns] = useState({}); // Object to store dropdown state for each row

  // Handle search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle the dropdown visibility for a specific row
  const toggleDropdown = (id) => {
    setDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the dropdown state for the specific row
    }));
  };

  // DataTable columns definition
  const columns = [
    {
      name: "Employee ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
        name: "Role",
        selector: (row) => row.role,
        sortable: true,
      },
    {
      name: "Department",
      selector: (row) => row.department,
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
        const [referenceElement, setReferenceElement] = useState(null); // Element for the button
        const [popperElement, setPopperElement] = useState(null); // Element for the dropdown
        const { styles, attributes } = usePopper(referenceElement, popperElement, {
          placement: "bottom-start", // Place dropdown below the button
          modifiers: [
            {
              name: "flip",
              enabled: true,
            },
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport", // Ensure the dropdown doesn't go out of the viewport
              },
            },
          ],
        });

        return (
          <div className="relative">
            {/* Ellipsis Button */}
            <button
              ref={setReferenceElement} // Set button reference for Popper
              onClick={() => toggleDropdown(row._id)} // Toggle dropdown for this row
              className="px-2 py-1 text-gray-600 hover:text-gray-900 focus:outline-none"
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

            {/* Dropdown Menu */}
            {dropdowns[row._id] && (
              <div
                ref={setPopperElement} // Set dropdown reference for Popper
                style={styles.popper} // Apply styles from Popper
                {...attributes.popper} // Apply attributes for proper positioning
                className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              >
                <div className="py-1">
                  <Link
                    to={`/admin-dashboard/view-employee/${row._id}`}
                    className="flex item-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaEye className="w-4 h-4 text-gray-600 mr-2" /> <span>View</span>
                  </Link>
                  <Link
                    to={`/admin-dashboard/edit-employee/${row._id}`}
                    className="flex item-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaPen className="w-4 h-4 text-gray-600 mr-2" /><span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="flex item-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FaTrash className="w-4 h-4 text-red-600 mr-2" /><span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // Handle Delete Button Click
  const handleDelete = (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((employee) => employee._id !== id));
    }
  };

  // Tailwind CSS custom styles for the table header
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold", // Apply Tailwind's font-bold to headers
      },
    },
  };

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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination={true}
          highlightOnHover={true}
          responsive={true}
          customStyles={customStyles} // Apply custom styles for the headers
        />
      )}
    </div>
  );
};

export default List;
