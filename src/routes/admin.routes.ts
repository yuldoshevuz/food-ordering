import { Router } from "express";
import adminController from "../controllers/admin.controller";

const adminRouter = Router()

adminRouter.post("/vendor", adminController.createVendor)
adminRouter.get("/vendors", adminController.getVendors)
adminRouter.get("/vendor/:vendorId"), adminController.getVendorById

export default adminRouter