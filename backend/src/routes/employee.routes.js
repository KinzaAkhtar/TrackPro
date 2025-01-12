import { Router } from "express";
import { applyLeave } from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route("/applyleave").post(upload.none(), applyLeave)
// // router.route("/login").post(login)





export default router