import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { Income } from '../Models/Income.js';

export const createIncome=asyncHandler(async(req,res)=>{
    const {amount,source,date}=req.body
    const income=new Income({
        user_id: req.user._id,
        amount,source,date
    })
    await income.save()
    res.status(201).json(income);
})
export const getIncomes=asyncHandler(async(req,res)=>{
    const incomes=await Income.find({user_id: req.user._id});
    res.status(201).json(incomes)
})
export const getIncomeById = asyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id);

    if (!income || income.user_id.toString() !== req.user._id.toString()) {
        throw new ApiError(404, 'Income not found');
    }

    res.json(income);
});

// Update an income entry by ID
export const updateIncome = asyncHandler(async (req, res) => {
    const { amount, source, date } = req.body;

    const income = await Income.findById(req.params.id);

    if (!income || income.user_id.toString() !== req.user._id.toString()) {
        throw new ApiError(404, 'Income not found');
    }

    income.amount = amount || income.amount;
    income.source = source || income.source;
    income.date = date || income.date;

    await income.save();
    res.json(income);
});

// Delete an income entry by ID
export const deleteIncome = asyncHandler(async (req, res) => {
    const income = await Income.findOneAndDelete({
        _id: req.params.id,
        user_id: req.user._id
    });

    if (!income) {
        throw new ApiError(404, 'Income not found');
    }

    res.json({ message: 'Income removed' });
});