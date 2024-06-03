const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const User = require('./Models/User');
const Expense = require('./Models/Expense');
const Income = require('./Models/Income');
const Budget = require('./Models/Budget');

const MONGODB_URI = 'mongodb://localhost:27017/personal_finance';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

const createFakeUser = async () => {
  const password = faker.internet.password();
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password_hash: passwordHash,
    created_at: faker.date.past()
  });

  await user.save();
  return user._id;
};

const createFakeExpense = async (userId) => {
  const expense = new Expense({
    user_id: userId,
    amount: faker.finance.amount(),
    category: faker.commerce.department(),
    description: faker.lorem.sentence(),
    date: faker.date.recent()
  });

  await expense.save();
};

const createFakeIncome = async (userId) => {
  const income = new Income({
    user_id: userId,
    amount: faker.finance.amount(),
    source: faker.company.companyName(),
    date: faker.date.recent()
  });

  await income.save();
};

const createFakeBudget = async (userId) => {
  const budget = new Budget({
    user_id: userId,
    category: faker.commerce.department(),
    amount: faker.finance.amount(),
    start_date: faker.date.past(),
    end_date: faker.date.future()
  });

  await budget.save();
};

const seedDatabase = async () => {
  await User.deleteMany({});
  await Expense.deleteMany({});
  await Income.deleteMany({});
  await Budget.deleteMany({});

  const userIds = [];

  for (let i = 0; i < 10; i++) {
    const userId = await createFakeUser();
    userIds.push(userId);
  }

  for (const userId of userIds) {
    for (let i = 0; i < 5; i++) {
      await createFakeExpense(userId);
      await createFakeIncome(userId);
      await createFakeBudget(userId);
    }
  }

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase();
