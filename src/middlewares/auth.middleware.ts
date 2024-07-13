import { Request, Response, NextFunction } from "express";
import jwtUtility from "../utility/jwt.utility";

class AuthMiddleware {
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        const signature = await jwtUtility.validateSignature(req)
        if (!signature) {
            res.status(401).json({
                ok: false,
                message: "You are not authorized"
            })
            return
        }

        next()
    }
}

export default new AuthMiddleware()