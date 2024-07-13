import { Router } from "express";

import environments from "../config/environments";
import adminRouter from "./admin.routes";
import vendorRouter from "./vendor.routes";

const router = Router()

router.use("/admin", adminRouter)
router.use("/vendor", vendorRouter)

export default router