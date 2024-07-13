import jwt from "jsonwebtoken"
import { AuthPayload } from "../dtos/auth.dto";
import environments from "../config/environments";
import { NextFunction, Request, Response } from "express";
import vendorRepo from "../repositories/vendor.repo";

class JwtUtility {
    public async generateSignature(payload: AuthPayload) {
        return jwt.sign(payload, <string>environments.JWT_SECRET, { expiresIn: "90d" })
    }

    public async validateSignature(req: Request): Promise<boolean> {
        const signature = req.headers.authorization
        if (!signature) {
            return false
        }

        try {
            const payload = <AuthPayload>jwt.verify(signature, <string>environments.JWT_SECRET)

            const existingUser = await vendorRepo.findById(payload._id)
            if (!existingUser) {
                return false
            }
    
            req.user = payload
            return true
        } catch (error) {
            return false
        }
    }
}

export default new JwtUtility()