import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget
} from '../controllers/budgetController.js';
const router=express.Router();


router.post('/', verifyJWT,createBudget);
 // All routes require authentication
router.get('/', verifyJWT,getBudgets);
router.get('/:id',verifyJWT, getBudgetById);
router.put('/:id',verifyJWT, updateBudget);
router.delete('/:id',verifyJWT, deleteBudget);
export default router;