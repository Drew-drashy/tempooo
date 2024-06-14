import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from './routes/user.routes.js';
import budgetRoutes from './routes/budget.routes.js'
import incomeRoutes from './routes/income.route.js'
import expenseRoutes from './routes/expense.route.js';
const app = new express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev")); //HTTP request logger middleware for node.js 

//routes import


app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/incomes',incomeRoutes)
app.use('/api/expense',expenseRoutes);
export default app;
