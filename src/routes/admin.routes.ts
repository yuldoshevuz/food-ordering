import { Router } from "express";
import adminController from "../controllers/admin.controller";

const adminRouter = Router()

adminRouter.get("/vendors", adminController.getVendors)
adminRouter.post("/vendors/create", adminController.createVendor)
adminRouter.get("/vendors/:vendorId", adminController.getVendorById)

export default adminRouter