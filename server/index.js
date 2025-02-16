// packages
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import orderRoute from './routes/orderRoute.js'
import { connectDB } from './config/connect.js'

// utils
dotenv.config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use('/users', userRoute)
app.use('/category', categoryRoute)
app.use('/orders', orderRoute)

app.get('/', (req, res) => {
    res.send('Welcome To Our Store')
})
connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port: ${port} 🚀`));
}).catch((error) => {
    console.error('Failed to start server:', error.message)
})