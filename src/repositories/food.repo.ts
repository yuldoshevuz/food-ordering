import { Request } from "express";
import { CreateFoodInput } from "../dtos/food.dto";
import { FoodDoc, foodModel } from "../models/food.model";
import { FilterQuery } from "mongoose";

class VendorRepo {
    public async findFoods(filter?: FilterQuery<FoodDoc>) {
        return await foodModel.find({ ...filter })
    }

    public async findById(id: string) {
        return await foodModel.findById(id)
    }

    public async create(food: FoodDoc) {
        return await foodModel.create(food)
    }

    // public async findByIdAndUpdate(id: string, newData: EditVendorInput) {
    //     const { name, foodType, address, phone } = newData

    //     const updatedFood = await foodModel.findByIdAndUpdate(id,
    //         { name, foodType, address, phone },
    //         { returnOriginal: false, lean: true }
    //     );
    //     return updatedFood
    // }
}

export default new VendorRepo()