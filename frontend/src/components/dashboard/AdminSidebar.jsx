import React from "react";
import sidebarLogo from '../../assets/sidebarLogo.png';
import LogoutLogo from '../../assets/LogoutLogoWhite.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FaCalendarCheck, FaDollarSign, FaHome, FaUserFriends, FaTachometerAlt, FaCog } from 'react-icons/fa';

const AdminSidebar = () => {
    const navigate = useNavigate(); // Hook to navigate to the login page

    // Function to handle logout and redirect to login
    const handleLogout = () => {
        // You can add any logout logic here (e.g., clear local storage, etc.)
        navigate('/login'); // Redirect to the login page 
    };

    return (
        <div className="bg-gradient-to-t from-red-700 via-orange-700 to-yellow-300 text-white h-[95vh] fixed left-3 top-3 bottom-0 space-y-2 w-64 rounded-lg">
            <div className="bg-white">
                <img src={sidebarLogo} alt="Image 1" className="w-25 mt-2" />
            </div>
            <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg backdrop-blur-lg max-w-xs mx-auto flex justify-center items-center mt-4">
                <Avatar name="Madiha Aftab" size="40" round={true} />
                <div className="profileContent">
                    <p className="name ml-4 text-sm">Madiha Aftab</p>
                    <p className="name ml-4 text-sm">madiha@gmail.com</p>
                </div>
            </div>
            <div className="mt-8">
                <NavLink to="/admin-dashboard" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`} end>
                    <FaHome className="mr-2" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employee" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaUserFriends className="mr-2" />
                    <span>Employees</span>
                </NavLink>
                <NavLink to="/admin-dashboard/attend-manage" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaCalendarCheck className="mr-2" />
                    <span>Attendance Management</span>
                </NavLink>
                <NavLink to="/admin-dashboard/payroll" className={({ isActive }) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg`}>
                    <FaDollarSign className="mr-2" />
                    <span>Payroll</span>
                </NavLink>
                <NavLink to="admin-dashboard/performance" className="flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg">
                    <FaTachometerAlt className="mr-2" />
                    <span>Performance Monitoring</span>
                </NavLink>
                <NavLink to="admin-dashboard/settings" className="flex items-center space-x-4 block py-2.5 px-4 hover:bg-yellow-600 rounded-lg">
                    <FaCog className="mr-2" />
                    <span>Settings</span>
                </NavLink>
                
            </div>
            <div className="absolute bottom-4 left-4">
                <img src={LogoutLogo} alt="Logout" className="h-auto max-w-40" />
                
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    //className="bg-gray-300 bg-opacity-60 text-lg px-4 py-1 rounded-lg hover:bg-gray-300 hover:bg-opacity-80">
                    className="absolute top-1/2 mt-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-700 bg-opacity-60 text-lg font-bold px-4 py-1 rounded-lg hover:bg-red-800 hover:bg-opacity-80">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
