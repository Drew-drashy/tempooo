import {Expense} from '../Models/Expense.js';
import {Income} from '../Models/Income.js';


export const checkExpenseThreshold = async (userId) => {
    const totalIncome = await Income.aggregate([
        { $match: { user_id: userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    console.log(totalIncome,'total income');

    const totalExpenses = await Expense.aggregate([
        { $match: { user_id: userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    console.log(totalExpenses,'total expenses');

    const income = totalIncome[0]?.total || 0;
    const expenses = totalExpenses[0]?.total || 0;
    
    const percentage = (expenses / income) * 100;
    // console.log(percentage,income,expenses);
    
    

    return { income, expenses, percentage };
};


