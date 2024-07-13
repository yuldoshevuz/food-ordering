import { Request, Response, NextFunction } from "express"
import { VendorLoginInput } from "../dtos/vendor.dto"
import vendorRepo from "../repositories/vendor.repo"
import passwordUtility from "../utility/password.utility"
import jwtUtility from "../utility/jwt.utility"
import { NullExpression } from "mongoose"

class VendorController {
    public async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as VendorLoginInput

        const existingUser = await vendorRepo.findByEmail(email)
        if (!existingUser) {
            res.status(400).json({
                ok: false,
                message: "Invalid credentials"
            })
            return
        }

        const matchPassword = await passwordUtility.validatePassword(password, existingUser.password)
        if (!matchPassword) {
            res.status(400).json({
                ok: false,
                message: "Invalid credentials"
            })
            return
        }

        const signature = await jwtUtility.generateSignature({
            _id: existingUser._id as string,
            email: existingUser.email,
            name: existingUser.name
        })

        res.status(200).json({
            ok: true,
            accessToken: signature
        })
    };

    public async register(req: Request, res: Response, next: NextFunction) {
        
    };

    public async getVendorProfile(req: Request, res: Response, next: NextFunction) {
        const user = req.user

        if (!user) {
            res.status(404).json({
                ok: false,
                message: "Vendor information not found"
            })
            return
        }

        const existingVendor = await vendorRepo.findById(user._id)

        res.status(200).json({
            ok: true,
            vendor: existingVendor
        })
    };
}

export default new VendorController()