import { NextFunction, Request, Response } from "express";
import { CreateFoodInput } from "../dtos/food.dto";
import vendorRepo from "../repositories/vendor.repo";
import foodRepo from "../repositories/food.repo";

class FoodController {
    public async getMyFoods(req: Request, res: Response, next: NextFunction) {
        const { user } = req

        if (user) {
            const foods = await foodRepo.findFoods({ vendorId: user._id })

            res.status(200).json({
                ok: true,
                data: foods
            })
        }
    }

    public async addFood(req: Request, res: Response, next: NextFunction) {
        const { user } = req

        const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body

        if (user) {
            const vendor = await vendorRepo.findById(user._id)
            if (!vendor) {
                res.status(401).json({
                    ok: false,
                    message: "You are not authorized"
                })
                return
            }

            const files = <Express.Multer.File[]>req.files

            const isEmptyFields = !(name && description && category && foodType && readyTime && price && files.length)

            if (isEmptyFields) {
                res.status(400).json({
                    ok: false,
                    message: "Please send all required parameters"
                })
                return
            }

            const images = files.map((file) => file.filename)

            const newFood = await foodRepo.create({
                vendorId: vendor._id,
                name,
                description,
                category,
                price,
                readyTime,
                foodType,
                images,
                rating: 0
            })

            vendor.foods?.push(newFood._id)
            await vendor.save()

            res.status(201).json({
                ok: true,
                data: newFood
            })
        }
    }
}

export default new FoodController()