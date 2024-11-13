import User from "../models/userModel.js";
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'

// create a user account
export const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    if(!username ||!email || !password) {
        res.status(400).json(message: 'All inputs are required!')
    }

    // add new users if not exist
    const userExist = await User.findOne({email})
    if (userExist)
        res.status(400).json(message: 'User Already Exist!')

    // creating strong password by encryptionto ensure security
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password:hashedPassword})
     try {
         await newUser.save()
         createToken(res, newUser._id)

         res.status(200).json({
             _id: newUser._id,
             username: newUser.username,
             email: newUser.email,
             isAdmin: newUser.isAdmin,
         })
     } 
    catch (error) {
        res.status(400).json(message: 'User Not Found!')
    }
    
})

// login controller... users login into the system
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    consiole.log(email)
    console.log(password)

    const exUser = await User.findOne ({email})
    if (exUser) {
        const isPasswordvalid = await bcrypt.compare(
            password,
            exUser.password
        )

        if (isPasswordValid){
            createToken(res, exUser._id)

            res.status(200).json({
                _id: exUser._id,
                username: exUser.username,
                email: exUser.email,
                isAdmin: exUser.isAdmin,
            })
            return
            
        }
    }
})


// logout controller... tokens and cookies for timeout sessions
const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httyOnly: true,
        expires: new Date(0)
    })

    res.status(200).json(message: 'You are now Logged Out')
})

// ADMIN rights
// get all users in the system
const getAllUsers = asyncHandler(async (req, res) => {
    res.json(users)
})


// load the current user profile/details
const getCurrentUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findByid(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
        })
    } else {
        res.status(400).json(message: 'User Not Found!')
    }
})

// admin can update user profile
const updateCurrentUserProfile = asyncHandler (async (req,res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })     
    } else {
        res.status(400).json(message: 'No match Found')
    }
})




