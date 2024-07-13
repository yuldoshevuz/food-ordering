import { Environments } from "../interfaces";
import dotenv from "dotenv"

dotenv.config()

const {
    PORT,
    MONGO_URI,
    HOST,
    BASE_PATH,
    JWT_SECRET
} = process.env as Environments

const environments: Environments = {
    PORT: Number(PORT) || 5000,
    MONGO_URI,
    HOST: HOST || "localhost:5000",
    BASE_PATH: BASE_PATH || "/v1",
    JWT_SECRET
}

export default environments