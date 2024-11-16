// packages
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'

// utils
import {connectDB} from './config/db.js'

dotenv.config()
const port = process.env.PORT

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// app.get('/api/users', (req, res) => {
//     res.send('Welcome to the sokos store!')
// })

app.use('/api/users', userRoute)

app.listen(port, ()=> console.log(`Connection successful😎!..Server running on port:${port}`))