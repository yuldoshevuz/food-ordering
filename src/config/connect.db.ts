import mongoose from "mongoose"
import environments from "./environments"

const connectDB = async () => {
    try {
        await mongoose.connect(environments.MONGO_URI as string)
        console.log("DB connected successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB