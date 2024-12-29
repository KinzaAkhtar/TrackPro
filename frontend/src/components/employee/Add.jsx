import axios from "axios";
import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Add = () => {
    const [formData, setFormData] = useState({})
    const Navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })
        try {
            const response = await axios.post('/api/v1/user/register', formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                Navigate("/admin-dashboard/employee");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }


    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                        <input type="text" name="ID" onChange={handleChange} placeholder="Insert ID" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" onChange={handleChange} placeholder="Insert Name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" name="email" onChange={handleChange} placeholder="Insert Email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input type="date" name="DOB" onChange={handleChange} placeholder="Insert DOB" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select name="gender" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="preferNotToSay">Prefer Not to Say</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select name="department" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                            <option value="it">IT</option>
                            <option value="dept2">Dept2</option>
                            <option value="dept3">Dept3</option>
                            <option value="dept4">Dept4</option>
                            <option value="dept5">Dept5</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                        <select name="maritalStatus" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                            <option value="male">Single</option>
                            <option value="female">Married</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Designation</label>
                        <select name="designation" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                            <option value="intern">Internee</option>
                            <option value="executive">Executive</option>
                            <option value="manager">Manager</option>
                            <option value="tl">Team Lead</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salary</label>
                        <input type="number" name="salary" onChange={handleChange} placeholder="Insert Salary" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="******" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select name="role" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="number" name="phoneNo" onChange={handleChange} placeholder="123456" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input type="file" name="image" onChange={handleChange} placeholder="Uplaod Image" accept="image/*" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
                    </div> */}
                    <button type="submit" className="w-full mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Add