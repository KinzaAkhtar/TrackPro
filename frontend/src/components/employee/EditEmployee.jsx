// EditEmployee.js

import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";

const EditEmployee = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState(employee);

  useEffect(() => {
    setFormData(employee); // Reset form data if employee changes
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated data to the parent
  };

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h5" className="text-center font-semibold text-gray-800 mb-6">
        Edit Employee
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Full Name"
          name="fullname"
          variant="outlined"
          fullWidth
          value={formData.fullname}
          onChange={handleInputChange}
          className="bg-white"
        />
        <TextField
          label="Designation"
          name="designation"
          variant="outlined"
          fullWidth
          value={formData.designation}
          onChange={handleInputChange}
          className="bg-white"
        />
        <TextField
          label="Work Email"
          name="workEmail"
          variant="outlined"
          fullWidth
          value={formData.workEmail}
          onChange={handleInputChange}
          className="bg-white"
        />
        <TextField
          label="Phone Number"
          name="phoneno"
          variant="outlined"
          fullWidth
          value={formData.phoneNo}
          onChange={handleInputChange}
          className="bg-white"
        />
        <TextField
          label="Department"
          name="dept"
          variant="outlined"
          fullWidth
          value={formData.dept}
          onChange={handleInputChange}
          className="bg-white"
        />
        <TextField
          label="Salary"
          name="salary"
          variant="outlined"
          fullWidth
          value={formData.salary}
          onChange={handleInputChange}
          className="bg-white"
        />
        <div className="flex justify-between space-x-2">
          <Button
            type="submit"
            variant="contained"
            className="w-full py-2"
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "red", color: "red" }}
            className="w-full py-2"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
