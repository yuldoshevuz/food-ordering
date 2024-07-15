import { Router } from "express";
import foodController from "../controllers/food.controller";
import fileUtility from "../utility/file.utility";
import fileMiddleware from "../middlewares/file.middleware";

const foodRouter = Router()

foodRouter.get("/", foodController.getMyFoods)
foodRouter.post("/add",
    fileUtility.upload.array("images"),
    fileMiddleware.checkFileError,
    foodController.addFood
)

export default foodRouter