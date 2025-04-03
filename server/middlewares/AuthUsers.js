import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authUsers = async (req, res, next) => {
  let token;
  // Read JWT from jwt cookies
  token = req.cookies?.jwt

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication Required! No tokens found!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }
    req.user = user;
    next();

  } catch (error) {
    console.error('Middleware error', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired tokens!' });
  }
};

// Check if user is an admin
export const authAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Ooops! Only Admins are Authorized!' });
  }
};