import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyJWT, getUserProfile);
router.put('/profile', verifyJWT, updateUserProfile);

export default router;
