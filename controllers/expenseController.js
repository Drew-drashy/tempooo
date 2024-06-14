import {Expense} from '../Models/Expense.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { checkExpenseThreshold } from '../utils/notification.js';
import emailjs from 'emailjs-com';
// Create a new expense
export const createExpense = asyncHandler(async (req, res) => {
    const { amount, category, description, date } = req.body;
    // console.log(req.body)
    const expense = new Expense({
        user_id: req.user._id,
        amount,
        category,
        description,
        date
    });
    // console.log('before percentage')
    const {  income, expenses, percentage } = await checkExpenseThreshold(req.user._id);
    
    console.log(percentage,'percentage in creation')
    if (percentage > 80) { // Example threshold: 80%
        // console.alert( 'your expense are getting high!!!')
        console.log('your expense are getting higher')
        emailjs.init('wf9wUz_65zhB58JJc');
       const formData=` your expense are getting higher as per your total income :${ income} and total expense ${expenses}`
        const emailParams = {
            from_name: `${req.user._id}`,
            from_email: 'drashy21461@iiitd.ac.in',
            to_name: 'Drashy Sesodia',
            to_email: 'drashysesodia110053@gmail.com',
            message: JSON.stringify(formData,null,2), // Converts form data to a pretty-printed JSON string
          }
        //   console.log('email')/
        
        //   await emailjs.send('service_dmaw1no', 'template_p44yaw4', emailParams);
          console.log('Email sent successfully');
    }

    await expense.save();
    res.status(201).json(expense);
});

// Get all expense entries for the logged-in user
export const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ user_id: req.user._id });
    res.json(expenses);
});

// Get a single expense entry by ID
export const getExpenseById = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user_id.toString() !== req.user._id.toString()) {
        throw new ApiError(404, 'Expense not found');
    }

    res.json(expense);
});

// Update an expense entry by ID
export const updateExpense = asyncHandler(async (req, res) => {
    const { amount, category, description, date } = req.body;
    // console.log(req.body)
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user_id.toString() !== req.user._id.toString()) {
        throw new ApiError(404, 'Expense not found');
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();
    const { percentage } = await checkExpenseThreshold(req.user._id);
    console.log(percentage,'percentage in updation')
    if (percentage > 80) { // Example threshold: 80%
        await sendNotification(req.user, `Your expenses have reached ${percentage.toFixed(2)}% of your total income.`);
    }
    res.json(expense);
});

// Delete an expense entry by ID
export const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findOneAndDelete({
        _id: req.params.id,
        user_id: req.user._id
    });

    if (!expense) {
        throw new ApiError(404, 'Expense not found');
    }

    res.json({ message: 'Expense removed' });
});
