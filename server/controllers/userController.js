import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import asyncHandler from '../middlewares/asyncHandler.js'

export const createUser = asyncHandler(async (req, res) => {
    try {
        res.send('Hello There!')
    const {username, email, password} = req.body
    console.log(username)
    console.log(email)
    console.log(password)

    if (!username || !email || !password) {
        res.status(400).json({message: 'All Inputs are required!'})
    }

    const userExist = await User.findOne({email})
    if (userExist) {
        res.status(400).json({message:'User already exists!'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({username, email, password: hashedPassword})

    await new User.save();
    createToken(res, newUser._id);

    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email:newUser.email,
        isAdmin: newUser.isAdmin,
    })

    } catch (error) {
        res.status(200).json({message: error.message})
    }
    
})
