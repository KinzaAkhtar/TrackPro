import React, { useEffect, useState } from "react";
import sidebarLogo from '../../assets/sidebarLogo.png';
import LogoutLogo from '../../assets/LogoutLogoWhite.png';
import user from '../../assets/user.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FaCalendarCheck, FaDollarSign, FaHome, FaTachometerAlt, FaTasks, FaCog } from 'react-icons/fa';

const TLSidebar = () => {
    const navigate = useNavigate(); // Hook to navigate to the login page
    const [userDetails, setUserDetails] = useState(null); // State to hold the user details

    // Function to handle logout and redirect to login
    const handleLogout = () => {
        // Clear local storage and navigate to login page
        localStorage.clear();
        navigate('/login'); // Redirect to the login page
    };

    // Retrieve user information from localStorage when the component mounts
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUserDetails(userData); // Set user details in the state
        }
    }, []);

    return (
        <div className="bg-gradient-to-t from-red-700 via-orange-700 to-yellow-300 text-white h-[95vh] fixed left-3 top-3 bottom-0 space-y-2 w-64 rounded-lg">
            <div className="bg-white">
                <img src={sidebarLogo} alt="Sidebar Logo" className="w-25 mt-2" />
            </div>
            <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg backdrop-blur-lg max-w-xs mx-auto flex justify-center items-center mt-4">
                <Avatar name={userDetails ? userDetails.name : "User"} size="40" round={true} />
                <div className="profileContent">
                    <p className="name ml-4 text-sm">{userDetails ? userDetails.name : "Username here"}</p>
                    <p className="name ml-4 text-sm">{userDetails ? userDetails.email : "username@gmail.com"}</p>
                </div>
            </div>
            <div className="mt-8">
                <NavLink to="/tl-dashboard" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`} end>
                    <FaHome className="mr-2" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/tl-dashboard/performance-monitoring" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaTachometerAlt className="mr-2" />
                    <span>Performance Monitoring</span>
                </NavLink>
                <NavLink to="/tl-dashboard/attendance-and-leaves" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaCalendarCheck className="mr-2" />
                    <span>Attendance and Leaves</span>
                </NavLink>
                <NavLink to="/tl-dashboard/payroll" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaDollarSign className="mr-2" />
                    <span>Payroll</span>
                </NavLink>
                <NavLink to="/tl-dashboard/tasks" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaTasks className="mr-2" />
                    <span>Task Management</span>
                </NavLink>
                <NavLink to="/tl-dashboard/settings" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaCog className="mr-2" />
                    <span>Settings</span>
                </NavLink>
            </div>
            <div className="absolute bottom-4 left-4">
                <img src={LogoutLogo} alt="Logout" className="h-auto max-w-40" />
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="absolute top-1/2 mt-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-700 bg-opacity-60 text-lg font-bold px-4 py-1 rounded-lg hover:bg-red-800 hover:bg-opacity-80">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default TLSidebar;
