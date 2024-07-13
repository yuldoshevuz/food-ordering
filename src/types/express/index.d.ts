import { AuthPayload } from "../../dtos/auth.dto";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}
