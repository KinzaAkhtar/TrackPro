import React, { useState } from 'react';

const EmployeeList = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Mock employees data
  const employees = [
    { _id: '1', name: 'John Doe', designation: 'Software Engineer', department: 'Engineering', phoneNo: '03232566196', role: 'Admin' },
    { _id: '2', name: 'Jane Smith', designation: 'Product Manager', department: 'Product', phoneNo: '03232566196', role: 'Employee' },
    // Add more employees here as needed
  ];

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setDrawerOpen(true); // Open the drawer when clicking "Edit"
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <ul className="space-y-2">
        {employees.map((employee) => (
          <li key={employee._id} className="flex justify-between items-center p-2 border-b">
            <div>
              {employee.name} - {employee.designation}
            </div>
            <button
              onClick={() => handleEditClick(employee)}
              className="bg-blue-500 text-white py-1 px-4 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 w-1/3 h-full bg-white p-4 shadow-lg transform transition-all duration-300 ease-in-out translate-x-0">
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
            <EmployeeForm employee={selectedEmployee} closeDrawer={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const EmployeeForm = ({ employee, closeDrawer }) => {
  const [formData, setFormData] = useState({
    name: employee.name,
    designation: employee.designation,
    department: employee.department,
    phoneNo: employee.phoneNo,
    role: employee.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated employee:', formData);
    closeDrawer(); // Close the drawer after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone No.</label>
        <input
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={closeDrawer}
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeList;

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const navigate = useNavigate();
  
  const [employeeData, setEmployeeData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  
  useEffect(() => {
    // Fetch employee data when component mounts
    axios.get(`http://localhost:5000/api/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      setEmployeeData(response.data);
      setFormData(response.data); // Populate form fields with employee data
      setIsSliderOpen(true); // Open slider when data is fetched
    })
    .catch(error => {
      console.error('Error fetching employee data', error);
    });
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/employee/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert('Employee updated successfully');
        navigate('/admin-dashboard/employee'); // Redirect after successful update
      }
    } catch (error) {
      console.error('Error updating employee', error);
    }
  };

  if (!employeeData) return <div>Loading...</div>;

  return (
    <div className={`fixed inset-0 z-50 bg-gray-500 bg-opacity-50 ${isSliderOpen ? 'block' : 'hidden'}`}>
      <div className="absolute right-0 top-0 w-1/3 bg-white p-8 h-full">
        <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input type="text" name="ID" value={formData.ID} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required disabled />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="preferNotToSay">Prefer Not to Say</option>
              </select>
            </div>


            <div className="mt-6">
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Save Changes</button>
            </div>
          </div>
        </form>

        <button
          onClick={() => setIsSliderOpen(false)}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default EditEmployee;*/
