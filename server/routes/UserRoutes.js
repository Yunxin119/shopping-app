import express from 'express';
const router = express.Router();
import { authUser, registerUser, getAllUser, getUserById, updateUserById, getUserProfile, updateUserProfile, deleteUser } from '../controllers/UserController.js';
import {protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getAllUser).post(registerUser);
router.route('/auth').post(authUser)
router.route('/:id').get(protect, admin,getUserById).patch(protect, admin,updateUserById).delete(protect, admin,deleteUser);
router.route('/profile').get(protect,getUserProfile).patch(protect,updateUserById)

export default router;
