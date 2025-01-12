import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/employee.model.js";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { getTimeAsDate } from "../utils/TimeAsDate.js"


const AddEmployee = asyncHandler(async (req, res) => {
    const {
        personalInfo,
        employmentDetails,
        portalLogin,
        compensation,
    } = req.body;
    console.log(req.body)

    // Validate required fields
    if (
        !personalInfo?.fullName ||
        !personalInfo?.dob ||
        !personalInfo?.gender ||
        !personalInfo?.phone ||
        !personalInfo?.email ||
        !employmentDetails?.employeeID ||
        !employmentDetails?.department ||
        !employmentDetails?.designation ||
        !employmentDetails?.checkInTime ||  // Validate check-in time
        !employmentDetails?.checkOutTime ||  // Validate check-out time
        !portalLogin?.workEmail ||
        !portalLogin?.password ||
        !compensation?.salary
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existingEmployee = await Employee.findOne({
        $or: [
            { email: personalInfo.email },
            { workemail: portalLogin.workEmail },
        ],
    });

    if (existingEmployee) {
        throw new ApiError(409, "User with this email already exists");
    }

    // Handle file uploads
    const cvLocalPath = req.files['files[cv]']?.[0]?.path || null;
    const photoLocalPath = req.files['files[photo]']?.[0]?.path || null;

    if (!photoLocalPath) {
        throw new ApiError(400, "Photo is required");
    }

    const photoUpload = await uploadOnCloudinary(photoLocalPath);
    const cvUpload = cvLocalPath
        ? await uploadOnCloudinary(cvLocalPath)
        : null;

    if (!photoUpload) {
        throw new ApiError(500, "Failed to upload photo");
    }
    // Create employee object
    const employee = await Employee.create({
        name: personalInfo?.fullName,
        date_of_birth: personalInfo?.dob,
        gender: personalInfo?.gender,
        email: personalInfo?.email,
        phoneno: personalInfo?.phone,
        ID: employmentDetails?.employeeID,
        date_of_joining: employmentDetails?.doj,
        department: employmentDetails?.department,
        designation: employmentDetails?.designation,
        checkInTime: getTimeAsDate(employmentDetails?.checkInTime), // Add check-in time
        checkOutTime: getTimeAsDate(employmentDetails?.checkOutTime), // Add check-out time
        salary: compensation?.salary,
        workemail: portalLogin?.workEmail,
        password: portalLogin?.password,
        photo: photoUpload?.url,
        cv: cvUpload?.url || "",  // Ensure cvUpload is optional
    });


    // Ensure the employee is created
    const createdEmployee = await Employee.findById(employee._id).select(
        "-password -refreshToken"
    );

    if (!createdEmployee) {
        throw new ApiError(500, "Failed to register employee");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdEmployee, "Employee registered successfully"));
});



// Get all employees
const getEmployee = asyncHandler(async (req, res) => {


    try {
        const employees = await Employee.find().select(
            "name ID phoneno workemail department designation"
        ); // Adjust fields as needed
        return res
            .status(201)
            .json(new ApiResponse(201, employees, "fetch employee successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to fetch employees"))
    }


});



// Get all employees
const createtask = asyncHandler(async (req, res) => {


    try {
        console.log(req.body);
        let myfile, myfile_upload = null;

        if (req.file) {
            myfile = req.file.path; // Path of the uploaded file
            myfile_upload = await uploadOnCloudinary(myfile); // Upload to Cloudinary
        }
        // const myfile = req.file['attachment']?.[0]?.path || null;
        // const myfile_upload = myfile
        //     ? await uploadOnCloudinary(myfile)
        //     : null;

        const { taskTitle, taskDescription, selectedDepartment, selectedTaskType, deadline, priority } = req.body;
        const newtask = await Task.create({
            title: taskTitle,
            description: taskDescription,
            department: selectedDepartment,
            tasktype: selectedTaskType,
            priority,
            deadline,
            attached_file: myfile_upload?.url || "",  // Ensure cvUpload is optional
        });
        if (!newtask) {
            return res.status(500)
                .json(new ApiResponse(500, "No task created!"))
        }
        return res
            .status(201)
            .json(new ApiResponse(201, "Task created successfully"))
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to create task!"))
    }
});

// Get all employees
const gettasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find().select(
            "title description department tasktype priority deadline status"
        ); // Adjust fields as needed
        return res
            .status(201)
            .json(new ApiResponse(201, tasks, "fetch task successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to fetch task"))
    }
});
const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const employee = await Employee.findByIdAndDelete(req.body.userId);

        if (!employee) {
            return res.status(404).json(new ApiResponse(404, 'Employee not found'));
        }
        return res
            .status(201)
            .json(new ApiResponse(201, "delete successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to delete employee"))
    }
});
const deleteTask = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const task = await Task.findByIdAndDelete(req.body.taskId);

        if (!task) {
            return res.status(404).json(new ApiResponse(404, 'Employee not found'));
        }
        return res
            .status(201)
            .json(new ApiResponse(201, "delete successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to delete employee"))
    }
});
const getLeaves = asyncHandler(async (req, res) => {
    try {
        // console.log(req.body)
        // const task = await Task.findByIdAndDelete(req.body.taskId);

        // if (!task) {
        //     return res.status(404).json(new ApiResponse(404, 'Employee not found'));
        // }
        // return res
        //     .status(201)
        //     .json(new ApiResponse(201, "delete successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed to get leave data"))
    }
});




export { AddEmployee, getEmployee, createtask, gettasks, deleteEmployee, deleteTask, getLeaves }