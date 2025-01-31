import express from 'express'
import {createUser, loginUser, logOutUser, getCurrentUserProfile, getAllUsers, deleteUser, updateUser} from '../controllers/userController.js'
import {authUsers, authAdmin} from '../middlewares/AuthUsers.js'

const router = express.Router()

// authenticate & authorize as admin  
router.route('/create').post(createUser)
 .get(authUsers, authAdmin, getAllUsers)

//  http:localhost:2700/api/users/auth
router.route('/login').post(loginUser) //login route
router.route('/logOut').post(logOutUser) //logout route

// HERE WE ARE WITH MORE PROGRESS
router.route('./profile')
router.get(authUsers, getCurrentUserProfile) //get current user profile
router.put(authUsers, getCurrentUserProfile)

// ADMIN rights to manage users
router.route('./:id')
router.delete(authUsers, authAdmin, deleteUser)
router.get(authUsers, authAdmin, getAllUsers)
router.get(authUsers, authAdmin, updateUser)

export default router
