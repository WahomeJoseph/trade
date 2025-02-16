import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

export const authUsers = asyncHandler(async (req,res,next) => {
  let token

  // Read JWT from jwt cookies
  token = req.cookies.jwt

 if (token) {
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     req.user = await User.findById(decoded.userId).select('-password')
     next() //go to the next request
   } catch (error) {
     res.status(401).json({message: 'Authentication Required!'})
   }
 } else {
   res.status(401).json({message: 'Authentication Required! No tokens found!'})
 }
})

// check if user id admin...only admin has rights
export const authAdmin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    next() //proceed to execute if user is admin
  } else {
    res.status(401).json({message: 'Only Admins are Authorized!'})
  }
}
