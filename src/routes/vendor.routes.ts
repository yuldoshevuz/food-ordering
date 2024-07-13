import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import vendorController from "../controllers/vendor.controller";

const vendorRouter = Router()

vendorRouter.post("/login", vendorController.login)

vendorRouter.use(authMiddleware.authenticate)

vendorRouter.get("/profile", vendorController.getVendorProfile)
vendorRouter.put("/profile/update", vendorController.updateVendorProfile)

export default vendorRouter