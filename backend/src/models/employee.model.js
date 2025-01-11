import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        ID: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        phoneno: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        date_of_joining: {
            type: Date,
            required: true,
        },
        checkInTime: {
            type: Date, // Stores the exact timestamp for check-in
            required: true,
        },
        checkOutTime: {
            type: Date, // Stores the exact timestamp for check-out
        },
        // shiftHours: {
        //     type: Number, // Total worked hours (calculated in hours or minutes)
        // },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        designation: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
        },
        workemail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
        assignedTasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
        notifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Notification",
            },
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        attendance: [
            {
                type: Schema.Types.ObjectId,
                ref: "Attendance",
            },

        ],
        photo: {
            type: String, // cloudinary url
            required: true,
        },
        cv: {
            type: String, // cloudinary url
        }
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash the password
employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Instance method to validate password
employeeSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Instance method to generate access token
employeeSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Instance method to generate refresh token
employeeSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const Employee = mongoose.model("Employee", employeeSchema);
