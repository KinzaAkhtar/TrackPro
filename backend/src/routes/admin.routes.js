import { Router } from "express";
import { AddEmployee, getEmployee, createtask, gettasks, deleteEmployee, deleteTask, getLeaves, gettaskcount, getheadcount, getcount } from "../controllers/admin.controller.js"
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
router.route("/getemployees").get(getEmployee)
router.route("/createtask").post(upload.single("attachment"), createtask)
router.route("/gettasks").get(gettasks)
router.route("/deleteEmployee").post(deleteEmployee)
router.route("/deleteTask").post(deleteTask)
router.route("/getLeaves").post(getLeaves)
router.route("/getheadcount").get(getheadcount)
router.route("/getcount").get(getcount)
router.route("/gettaskcount").get(gettaskcount)
// router.route("/getemployeelist").post(getemployeelist)





export default router