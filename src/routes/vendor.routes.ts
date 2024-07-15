import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import vendorController from "../controllers/vendor.controller";
import foodRouter from "./food.routes";
import fileUtility from "../utility/file.utility";
import fileMiddleware from "../middlewares/file.middleware";

const vendorRouter = Router()

vendorRouter.post("/login", vendorController.login)

vendorRouter.use(authMiddleware.authenticate)

vendorRouter.use("/foods", foodRouter)
vendorRouter.get("/profile", vendorController.getVendorProfile)
vendorRouter.put("/profile/update", vendorController.updateVendorProfile)
vendorRouter.post("/profile/coverImage",
    fileUtility.upload.array("images"),
    fileMiddleware.checkFileError,
    vendorController.updateVendorCoverImage
)

export default vendorRouter