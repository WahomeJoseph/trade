import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const authUsers = asyncHandler(async (req,res,next) => {
  let token

  // Read JWT from jwt cookies
  token = req.cookies.jwt

 if (token) {
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     req.user = await User.findById(decoded.userId).select('-password')
     next()
   } catch (error) {
     res.status(401)
     throw new Error('Authentication Required!')
   }
 } else {
   res.status(401)
   throw new Error ('Authentication Required!')
 }
})

// Check if user id admin...only admin rights
export const authenticateAdmin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(400).json({message: 'Only Admins can make the changes!'})
  }
}
