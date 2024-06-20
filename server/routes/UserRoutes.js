import express from 'express';
const router = express.Router();
import { authUser, registerUser, logoutUser, getAllUser, getUserById, updateUserById, getUserProfile, updateUser, deleteUser } from '../controllers/UserController.js';
import {protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getAllUser).post(registerUser);
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserById)
router.route('/:id').get(protect, admin,getUserById).put(protect, admin,updateUser).delete(protect, admin,deleteUser);

export default router;
