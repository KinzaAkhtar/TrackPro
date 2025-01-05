import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const registerEmployee = asyncHandler(async (req, res) => {
    const { name, email, password, department, designation, role } = req.body;

    // Validate required fields
    if ([name, email, password, department, designation].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        throw new ApiError(409, "Employee with this email already exists");
    }

    // Create a new employee
    const employee = await Employee.create({
        name,
        email: email.toLowerCase(),
        password,
        department,
        designation,
        role: role || "Employee",
    });

    // Fetch employee without sensitive data
    const createdEmployee = await Employee.findById(employee._id).select(
        "-password -refreshToken"
    );

    if (!createdEmployee) {
        throw new ApiError(500, "Something went wrong while registering the employee");
    }

    return res.status(201).json(
        new ApiResponse(201, createdEmployee, "Employee registered successfully")
    );
});

export { registerUser }