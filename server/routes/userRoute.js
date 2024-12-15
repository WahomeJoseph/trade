import express from 'express'
import {createUser, loginUser, logOutUser, getCurrentUserProfile, updateUser, getUser, deleteUser, updateUser} from '../controllers/userController.js'
import {authUsers, authAdmin} from '../middlewares/AuthUsers.js'

const router = express.Router()

// authenticate & authorize as admin  
router.route('/create').post(createUser)
 .get(authUsers, authAdmin, getAllUsers)

router.route('/login').post(loginUser) //login route
router.route('/logOut').post(logOutUser) //logout route

// HERE WE ARE WITH MORE PROGRESS
router.route('./profile')
router.get(authUsers, getCurrentUserprofile) //get current user profile
router.put(authUsers, getCurrentUserProfile)

// ADMIN rights to manage users
router.route('./:id')
router.delete(authUsers, authAdmin, deleteUser)
router.get(authUsers, authAdmin, getUsersById)
router.get(authUsers, authAdmin, updateUser)

export default router
