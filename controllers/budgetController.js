import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import{ Budget }from '../Models/Budget.js'
import ApiResponse from '../utils/ApiResponse.js'

export const createBudget = asyncHandler(async (req, res) => {
    const { category, amount, start_date, end_date } = req.body;

     console.log(req.body)
    const budget = new Budget({
        user_id: req.user._id,
        category,
        amount,
        start_date,
        end_date
    });
    
    // console.log(budget," huhhhhhhhhh");
    await budget.save();
    res.status(201).json(budget);
});

export const getBudgets = asyncHandler(async (req, res) => {
    const budgets = await Budget.find({ user_id: req.user._id });
    res.json(budgets);
});

export const getBudgetById = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);

    if (!budget || budget.user_id.toString() !== req.user._id.toString()) {
        throw new ApiError(404, 'Budget not found');
    }
    res.json(budget);
});
export const updateBudget = asyncHandler(async (req, res) => {
    const { category, amount, start_date, end_date } = req.body;

    const budget = await Budget.findById(req.params.id);

    if (!budget || budget.user_id.toString() !== req.user._id.toString()) {
        throw new ApiError(404, 'Budget not found');
    }

    budget.category = category || budget.category;
    budget.amount = amount || budget.amount;
    budget.start_date = start_date || budget.start_date;
    budget.end_date = end_date || budget.end_date;

    await budget.save();
    res.json(budget);
});

export const deleteBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);

    if (!budget || budget.user_id.toString() !== req.user._id.toString()) {
        throw new ApiError(404, 'Budget not found');
    }

    await budget.deleteOne();
    res.json({ message: 'Budget removed' });
});

