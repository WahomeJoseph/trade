// packages
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'

// utils
import {connectDB} from './config/db.js'

dotenv.config()
const port = process.env.PORT || 5050

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Welcome to the soko store!')
})

app.use('/api/users', userRoutes)

app.listen(port, ()=> console.log(`Connection successful😎!..Server running on port: ${port}`))