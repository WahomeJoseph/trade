// packages
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRoute.js'
import { productRouter } from './routes/productRoute.js'
import { categoryRouter } from './routes/categoryRoute.js'
import { orderRouter } from './routes/orderRoute.js'
import { connectDB } from './config/connect.js'

dotenv.config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/category', categoryRouter)
app.use('/orders', orderRouter)

app.get('/', (req, res) => {
    res.send('Welcome To Our Store')
})
// DB connection
connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port: ${port} 🚀`));
}).catch((error) => {
    console.error('Failed to start server:', error.message)
})