import { Router } from "express";
import { login, logout } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/applyleave").post(upload.none(), applyLeave)
router.route("/login").post(upload.none(), login)
router.route("/logout").post(logout)





export default router