import { Router } from "express";
import { AddEmployee } from "../controllers/admin.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route("/addemployee").post(upload.fields([
    {
        name: "files[cv]",
        maxCount: 1

    },
    {
        name: "files[photo]",
        maxCount: 1
    }
]), AddEmployee)
router.route("/getemployeelist").post(getemployeelist)





export default router