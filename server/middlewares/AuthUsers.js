import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const authUsers = async (req,res,next) => {
  let token

  // Read JWT from jwt cookies
  token = req.cookies.jwt

 if (token) {
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     req.user = await User.findById(decoded.userId).select('-password')
     next() //proceed to the next request
   } catch (error) {
     res.status(401).json({message: 'Authentication Required!'})
   }
 } else {
   res.status(401).json({message: 'Authentication Required! No tokens found!'})
 }
}

// check if user is an admin
export const authAdmin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    next() //proceed to execute 
  } else {
    res.status(401).json({message: 'Only Admins are Authorized!'})
  }
}
