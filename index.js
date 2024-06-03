// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// // Connect Database
// connectDB();

// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express= require('express');
const mongoose =require('mongoose');
const cors=require('cors');
const { rawListeners } = require('./Models/User');
const app=express();
const UserModel=require('./Models/User');
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:127.0.0.1:27017/personal_finance")


app.get('/getuser')
app.listen(3031,()=>{
    console.log('server is runnning');
})
