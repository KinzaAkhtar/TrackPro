import React, { useEffect, useState } from "react";
import sidebarLogo from '../../assets/sidebarLogo.png';
import LogoutLogo from '../../assets/LogoutLogoWhite.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FaCalendarCheck, FaCog, FaDollarSign, FaHome, FaTasks } from 'react-icons/fa';
import axios from 'axios';

const EmployeeSidebar = () => {
    const [user, setUser] = useState(null); // State to store user data
    const navigate = useNavigate(); // Hook to navigate to the login page

    // Function to handle logout and redirect to login
    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/v1/user/logout');
            if (response.data.success) {
                console.log(response.data.message);
            }
            localStorage.clear(); // Clear additional client-side storage
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Retrieve user information from localStorage when the component mounts
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData)); // Set user details in the state
        }
    }, []);

    return (
        <div className="bg-gradient-to-t from-red-700 via-orange-700 to-yellow-300 text-white h-[95vh] fixed left-3 top-3 bottom-0 space-y-2 w-64 rounded-lg">
            <div className="bg-white">
                <img src={sidebarLogo} alt="Sidebar Logo" className="w-25 mt-2" />
            </div>
            <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg backdrop-blur-lg max-w-xs mx-auto flex justify-center items-center mt-4">
                <Avatar name={user?.name || "User"} size="40" round={true} />
                <div className="ml-4 text-sm">
                    <p>{user?.name || "Username here"}</p>
                    <p>{user?.workemail || "username@gmail.com"}</p>
                </div>
            </div>
            <div className="mt-8">
                <NavLink to="/employee-dashboard" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : ""} flex items-center py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaHome className="mr-2" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/employee-dashboard/attendance-and-leaves" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : ""} flex items-center py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaCalendarCheck className="mr-2" />
                    <span>Attendance and Leaves</span>
                </NavLink>
                <NavLink to="/employee-dashboard/payroll" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : ""} flex items-center py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaDollarSign className="mr-2" />
                    <span>Payroll</span>
                </NavLink>
                <NavLink to="/employee-dashboard/tasks" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : ""} flex items-center py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaTasks className="mr-2" />
                    <span>Tasks</span>
                </NavLink>
                <NavLink to="/employee-dashboard/settings" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : ""} flex items-center py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaCog className="mr-2" />
                    <span>Settings</span>
                </NavLink>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <img src={LogoutLogo} alt="Logout" className="h-6 w-6" />
                <button
                    onClick={handleLogout}
                    className="bg-red-700 bg-opacity-60 text-lg font-bold px-4 py-2 rounded-lg hover:bg-red-800 hover:bg-opacity-80">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default EmployeeSidebar;
