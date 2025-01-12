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


export { gettasks }