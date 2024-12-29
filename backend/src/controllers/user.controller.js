import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    // const { ID, name, email } = req.body
    // console.log("email: ", email);
    console.log(req.body);

    res.status(200).json({
        message: "I'm working fine!"
    })
})

export { registerUser }