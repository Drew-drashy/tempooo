import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createIncome,
    getIncomes,
    getIncomeById,
    updateIncome,
    deleteIncome
} from '../controllers/incomeController.js';
// import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(verifyJWT); // All routes require authentication

router.post('/', createIncome);
router.get('/', getIncomes);
router.get('/:id', getIncomeById);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

export default router;
