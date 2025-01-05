import React from "react";
import sidebarLogo from '../../assets/sidebarLogo.png';
import user from '../../assets/user.png';
import {NavLink} from 'react-router-dom';
import Avatar from 'react-avatar';
import {FaCalendar, FaCalendarCheck,FaTasks, FaCog, FaDollarSign, FaHammer, FaHome, FaTachometerAlt, FaUser, FaUserFriends} from 'react-icons/fa'

const TLSidebar = () => {
    return(
        //<div className="bg-gradient-to-t from-yellow-500 via-orange-700 to-red-700 text-white h-screen fixed left-0 top-0 bottom-0 sapce-y-2 w-64">
        <div className="bg-gradient-to-t from-red-700 via-orange-700 to-yellow-300 text-white h-[95vh]  fixed left-3 top-3 bottom-0 sapce-y-2 w-64 rounded-lg">
            <div className="bg-white">
                <img src={sidebarLogo} alt="Image 1" className=" w-25 mt-2" />
            </div>
            <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg backdrop-blur-lg max-w-xs mx-auto flex justify-center items-center mt-4">
                <Avatar name="Madiha Aftab" size="40" round={true} />
                <div className="profileContent">
                    <p className="name ml-4 text-sm">Madiha Aftab</p>
                    <p className="name ml-4 text-sm">madiha@gmail.com</p>
                </div>
            </div>
            <div className="mt-8">
                <NavLink to="/tl-dashboard" className={({isActive}) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 bock py-2.5 px-4 hover:bg-yellow-600 rounded-lg} `}
                end
                >
                    <FaHome className="mr-2"/>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/tl-dashboard/employee" className={({isActive}) => `${isActive ? "bg-white bg-opacity-20" : " "} flex items-center space-x-4 bock py-2.5 px-4 hover:bg-yellow-600 rounded-lg} `}>
                    <FaUserFriends className="mr-2"/>
                    <span>Team Management</span>
                </NavLink>
                <NavLink to="tl-dashboard/attendance" className="flex items-center space-x-4 bock py-2.5 px-4 hover:bg-yellow-600 rounded-lg">
                    <FaTachometerAlt className="mr-2"/>
                    <span>Performance Monitoring</span>
                </NavLink>
                <NavLink to="tl-dashboard/payroll" className="flex items-center space-x-4 bock py-2.5 px-4 hover:bg-yellow-600 rounded-lg">
                    <FaDollarSign className="mr-2"/>
                    <span>Payroll</span>
                </NavLink>
                <NavLink to="tl-dashboard/performance" className="flex items-center space-x-4 bock py-2.5 px-4 hover:bg-yellow-600 rounded-lg">
                    <FaCalendarCheck className="mr-2"/>
                    <span>Attendance Management</span>
                </NavLink>
                <NavLink to="tl-dashboard/performance" className="flex items-center space-x-4 bock py-2.5 px-4 hover:bg-yellow-600 rounded-lg">
                    <FaTasks className="mr-2"/>
                    <span>Task Management</span>
                </NavLink>
                <NavLink to="tl-dashboard/settings" className="flex items-center space-x-4 bock py-2.5 px-4 hover:bg-yellow-600 rounded-lg">
                    <FaCog className="mr-2"/>
                    <span>Settings</span>
                </NavLink>
            </div>
            
        </div>
    )
}
export default TLSidebar