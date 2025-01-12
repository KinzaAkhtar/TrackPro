import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/employee.model.js";
import { Attendance } from "../models/attendance.model.js";
import { Leaves } from "../models/leave.model.js";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";


// Get all employees
const gettasks = asyncHandler(async (req, res) => {
    try {
        console.log
        if (req.user.designation != "Team Lead") {
            return res
                .status(400)
                .json(new ApiResponse(500, "Only Team Leads can access this list"))
        }
        const userDepartment = req.user.department;
        const tasks = await Task.find({ department: userDepartment }).select(
            "title description department tasktype priority deadline status"
        ); // Adjust fields as needed
        return res
            .status(201)
            .json(new ApiResponse(201, tasks, "fetch task successfully"))

    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to fetch task"))
    }
});


const getmembers = asyncHandler(async (req, res) => {
    try {
        // Check if the user is a Team Lead
        if (req.user.designation !== "Team Lead") {
            return res
                .status(400)
                .json(new ApiResponse(400, "Only Team Leads can access this list"));
        }

        // Get the user's department
        const userDepartment = req.user.department;

        // Find members in the same department, excluding Team Leads
        const members = await Employee.find({
            department: userDepartment,
            designation: { $ne: "Team Lead" }, // Exclude "Team Lead"
        }).select("name"); // Adjust fields as needed

        return res
            .status(200)
            .json(new ApiResponse(200, members, "Fetched members successfully"));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to fetch members"));
    }
});

const getemployeecount = asyncHandler(async (req, res) => {
    try {
        console.log
        if (req.user.designation != "Team Lead") {
            return res
                .status(400)
                .json(new ApiResponse(500, "Only Team Leads can access this count"))
        }
        const userDepartment = req.user.department;
        const employeecount = await Employee.countDocuments({ department: userDepartment })
        return res
            .status(201)
            .json(new ApiResponse(201, employeecount, "fetch count successfully"))

    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to fetch count"))
    }
});


export { gettasks, getmembers, getemployeecount }