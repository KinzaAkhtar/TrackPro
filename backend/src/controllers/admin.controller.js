import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { upload } from "../middlewares/multer.middleware.js";
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



export { AddEmployee }