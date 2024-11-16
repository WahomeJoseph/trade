import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'

// create a user account
export const createUser = asyncHandler(async (req, res) => {
    res.send('Hello There!')
})

// update current user profile
export const updateCurrentUserProfile = asyncHandler (async (req,res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }

        // updated user details
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })     
    } else {
        res.status(400).json({message: 'No match Found'})
    }
})

// admin to delete users
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res.status(400).json({message: 'Admin cannot be deleted'})
        }

        await User.deleteOne({_id: user._id})
        res.json({message: 'User Successfully Removed!'})
    } else {
        res.status(404).json({message: 'User Not Found'})
    }
})

// admin to retrieve a single user
export const getUser = asynchandler(async (req, res) => {
    const user =  await User.findById(req.params.id).select('password')

    if (user) {
        res.json(user)
    } else {
        res.status(400).json({message: 'No Match Found!'})
    }
})


// admin to update a single user profile
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: upatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404).json({message: 'User Not Found'})
    }
})


