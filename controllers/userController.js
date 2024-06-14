
import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import{ User }from '../Models/User.js'
import ApiResponse from '../utils/ApiResponse.js'

// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        throw new ApiError(404,'All field are required');
    }
    const userExistmail=await User.findOne({email});
    const userExistname=await User.findOne({username})
    console.log(userExist,'exists')
    if(userExistmail || userExistname ) throw new ApiError(404,'User exsits')
    const user=await User.create({
        username,email,password
    })
    const createdUser=await User.findById(user._id).select('-password')
    if(!createdUser) throw new ApiError(500,'User registration failed')
    return res.status(201).json(new ApiResponse(200,createdUser,'user registered successfuly'))
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(400, 'Invalid credentials');
    }

    // Generate token
    const token = generateToken(user);

    res.json({ token });
});

// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
    console.log('Hii');
    const user = await User.findById(req.user._id).select('-password');
    // console.log(req.user);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    console.log(user)
    res.json(user);
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    console.log('jii');
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const { username, email, password } = req.body;

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
});