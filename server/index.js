// packages
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import { connectDB } from './config/connect.js'

// utils
dotenv.config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/api/users', userRoute)
app.use('/api/category', categoryRoute)

connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port: ${port} 🚀`));
}).catch((error) => {
    console.error('Failed to start server:', error.message)
})