import mongoose from 'mongoose'
export const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://ghostbar:Y3kuPSwn1UNIMX8J@cluster00.ptra8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00'
        ). then(() => {
            console.log('DB connected successfully!')
        })
    } catch (error) {
        console.error('DB connection failed!!!!!!!')
        process.exit(1)
    }
}