import { AuthPayload } from "../dtos/auth.dto";

declare module "express" {
    interface Request {
        user?: AuthPayload;
    }
}

export interface Environments {
    PORT?: number;
    MONGO_URI?: string;
    HOST?: string;
    BASE_PATH?: string;
    JWT_SECRET?: string;
}