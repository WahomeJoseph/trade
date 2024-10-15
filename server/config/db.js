import mongoose, { modelNames } from 'mongoose'

export const connectDB = async () => {
    try {

        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Connection to MongoDB is successful!')

    } catch (error) {
        console.error(`ERROR: ${error.message}`)
        process.exit(1)
    }
}