import { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dtos/vendor.dto";
import vendorRepo from "../repositories/vendor.repo";
import passwordUtility from "../utility/password.utility";
import { vendorModel } from "../models/vendor.model";

class AdminController {
    public async createVendor(req: Request, res: Response, next: NextFunction) {
        const {
            name,
            address,
            pincode,
            foodType,
            email,
            password,
            ownerName,
            phone
        } = <CreateVendorInput>req.body

        const existingVendor = await vendorRepo.findByEmail(email)
        if (!existingVendor) {
            res.status(400).json({
                ok: false,
                message: "A vandor is exist with this email ID"
            })
            return
        }

        const salt = await passwordUtility.generateSalt()
        const hashedPassword = await passwordUtility.generatePassword(password, salt)

        const newVendor = await vendorModel.create({
            name,
            address,
            pincode,
            foodType,
            email,
            password: hashedPassword,
            ownerName,
            phone,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
            lat: 0,
            long: 0
        })

        res.status(201).json({
            ok: true,
            data: newVendor
        })
    };

    public async getVendors(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            message: "Hello from vendors"
        })
    };

    public async getVendorById(req: Request, res: Response, next: NextFunction) {
        
    }
}

export default new AdminController()