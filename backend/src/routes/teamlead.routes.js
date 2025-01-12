import { Router } from "express";
import { gettasks } from "../controllers/teamlead.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

// router.route("/applyleave").post(upload.none(), applyLeave)
router.route("/gettasks").get(verifyJWT, gettasks)



export default router