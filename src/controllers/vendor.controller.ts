import { Request, Response, NextFunction } from "express"
import { EditVendorInput, VendorLoginInput } from "../dtos/vendor.dto"
import vendorRepo from "../repositories/vendor.repo"
import passwordUtility from "../utility/password.utility"
import jwtUtility from "../utility/jwt.utility"

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

        const matchPassword = await passwordUtility.validatePassword(password, <string>existingUser.password)
        if (!matchPassword) {
            res.status(400).json({
                ok: false,
                message: "Invalid credentials"
            })
            return
        }

        const signature = await jwtUtility.generateSignature({
            _id: String(existingUser._id),
            email: <string>existingUser.email,
            name: <string>existingUser.name
        })

        res.status(200).json({
            ok: true,
            accessToken: signature
        })
    };

    public async getVendorProfile(req: Request, res: Response, next: NextFunction) {
        const { user } = req

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

    public async updateVendorProfile(req: Request, res: Response, next: NextFunction) {
        const { user } = req
        const { name, foodType, phone, address } = <EditVendorInput>req.body

        if (user) {
            const updatedVendor = await vendorRepo.findByIdAndUpdate(user?._id,
                { foodType, name, address, phone }
            )

            res.status(200).json({
                ok: true,
                data: updatedVendor
            })
        }
    };

    public async updateVendorCoverImage(req: Request, res: Response, next: NextFunction) {
        const { user } = req
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
            if (!files || !files.length) {
                res.status(400).json({
                    ok: false,
                    message: "Please, upload cover image"
                })
                return
            }

            const images = files.map((file) => file.filename)

            vendor.coverImages?.push(...images)
            await vendor.save()

            res.status(200).json({
                ok: true,
                data: vendor
            })
        }
    }
}

export default new VendorController()