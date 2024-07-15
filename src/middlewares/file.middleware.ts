import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

class FileMiddleware {
    public checkFileError = (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof MulterError) {
            // Multer specific errors
            return res.status(400).json({
                ok: false,
                message: err.message
            });
        } else if (err instanceof Error) {
            // Custom errors or other unknown errors
            try {
                const parsedError = JSON.parse(err.message);
                return res.status(400).json(parsedError);
            } catch (e) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal server error'
                });
            }
        }
        next();
    };
}

export default new FileMiddleware()