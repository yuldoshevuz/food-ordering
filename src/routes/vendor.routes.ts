import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import vendorController from "../controllers/vendor.controller";

const vendorRouter = Router()

vendorRouter.use(authMiddleware.authenticate)

vendorRouter.get("/profile", vendorController.getVendorProfile)

export default vendorRouter