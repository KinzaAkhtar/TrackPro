import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/employee.model.js";
import { Attendance } from "../models/attendance.model.js";
import { Leaves } from "../models/leave.model.js";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";


const generateAccessToken = async (userId) => {
    try {
        const user = await Employee.findById(userId)
        const accessToken = user.generateAccessToken()
        return accessToken


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const login = asyncHandler(async (req, res) => {
    console.log(req.body);
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { workemail, password } = req.body
    console.log(workemail);

    if (!workemail) {
        throw new ApiError(400, "email is required")
    }
    if (workemail == "admin@trackpro.com") {
        if (password != "12345") {
            throw new ApiError(400, "Invalid correct")
        }
        else {
            //login admin and return
            const access_token = jwt.sign(
                {
                    _id: "admin",
                    email: "admin@trackpro.com",
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
                }
            );

            return res.
                status(201).
                json(
                    new ApiResponse(201,
                        {
                            access_token,
                            user: {
                                role: "admin",
                                name: "Guest",
                                email: "guest@example.com",
                            }
                        },
                        "Admin login succesfully")
                );
        };

    }

    const user = await Employee.findOne({
        $or: [{ workemail }]
    })

    if (!user) {
        throw new ApiError(404, "Invalid email")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password")
    }
    const accessToken = await generateAccessToken(user._id)

    const loggedInUser = await Employee.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                { accessToken, user: loggedInUser },
                "Logged In Successfully"
            )
        )
})

const logout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

export { login, logout }