import express from 'express'
import {createUser} from '../controllers/userController.js'
const router = express.Router()

// end point to add new users
router.route('/create').post(createUser).get(authenticate, authorizeAdmin, getAllUsers)

export default router
