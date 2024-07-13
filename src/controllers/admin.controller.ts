import { NextFunction, Request, Response } from "express";
import { CreateVendorInput, VendorByIdParams } from "../dtos/vendor.dto";
import vendorRepo from "../repositories/vendor.repo";
import passwordUtility from "../utility/password.utility";
import { vendorModel } from "../models/vendor.model";
import { isObjectIdOrHexString } from "mongoose";

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

        const isEmptyFields = !(name && address && pincode && foodType && email && password && ownerName && phone)

        if (isEmptyFields) {
            res.status(400).json({
                ok: false,
                message: "Please send all required parameters"
            })
            return
        }

        const existingVendor = await vendorRepo.findByEmail(email)
        if (existingVendor) {
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
        const vendors = await vendorRepo.findVendors()

        res.status(200).json({
            ok: true,
            data: vendors
        })
    };

    public async getVendorById(req: Request<VendorByIdParams>, res: Response, next: NextFunction) {
        const { vendorId } = req.params

        if (!isObjectIdOrHexString(vendorId)) {
            res.status(400).json({
                ok: false,
                message: "Vendor id is in invalid"
            })
            return
        }

        const existingVendor = await vendorRepo.findById(vendorId)
        if (!existingVendor) {
            res.status(404).json({
                ok: false,
                message: "No vendor found with this id"
            })
            return
        }

        res.status(200).json({
            ok: true,
            data: existingVendor
        })
    }
}

export default new AdminController()