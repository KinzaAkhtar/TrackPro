import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/employee.model.js";
import { Attendance } from "../models/attendance.model.js";
import { Leaves } from "../models/leave.model.js";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const applyLeave = asyncHandler(async (req, res) => {
    console.log(req.body);
    return res.status(201).json(
        new ApiResponse(201, "get leaves succesfully")
    );
});

export { applyLeave }