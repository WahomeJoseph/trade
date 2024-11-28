import express from 'express'
import {createUser, loginUser, logoutCurrentUser, getCurrentUserProfile, updateUser, getUser, deleteUser, updateUser} from '../controllers/userController.js'
import {authenticateUsers, authenticateAdmin} from '../middlewares/AuthUsers.js'

const router = express.Router()
router.route('/').post(createUser)
router.route('/login').post(loginUser) //login route
router.route('/logOut').post(logOutUser) //logout route

// end point to add new users  
router.route('/create').post(createUser)
 .get(authenticateUsers, authenticateAdmin, getAllUsers)


router.route('./profile')
router.get(authenticateUsers, getCurrentUserprofile)
router.put(authenticateUsers, getCurrentUserProfile)

// ADMIN rights to manage users
router.route('./:id')
router.delete(authenticateUsers, authenticateAdmin, deleteUser)
router.get(authenticateUsers, authenticateAdmin, getUsersById)
router.get(authenticateUsers, authenticateAdmin, updateUser)

export default router
