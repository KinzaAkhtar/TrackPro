import { Router } from "express";
import { AddEmployee } from "../controllers/admin.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route("/addemployee").post(upload.fields([
    {
        name: "cv",
        maxCount: 1

    },
    {
        name: "dp",
        maxCount: 1
    }
]), AddEmployee)
// router.route("/login").post(login)





export default router