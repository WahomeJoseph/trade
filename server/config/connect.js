import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI
        ). then(() => {
            console.log('DB connected successfully!')
        })
    } catch (error) {
        console.error('DB connection failed!!!!!!!')
        process.exit(1)
    }
}