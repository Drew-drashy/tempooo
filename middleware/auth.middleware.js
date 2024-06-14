import JWT, { decode } from 'jsonwebtoken'
import {asyncHandler} from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js';
import {User} from '../Models/User.js';

export const verifyJWT=asyncHandler(async(req,_,next)=>{
    try{
        // console.log('finallllllllllllllllllllllll')
        const accessToken=req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","");
        // console.log(accessToken);
        if(!accessToken) throw new ApiError(401,'Unauthorized request');
        const decodedToken=JWT.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedToken,'decode')
        const user=await User.findById(decodedToken?._id).select('-password')
        // console.log(user,'user');
        if(!user){
            throw new ApiError(402,'invalid access to token')
        }
        // console.log('finallllllllllllllllllllllll')
        req.user=user;
        next();
        
    }
    catch(err){
        throw new ApiError(401,err?.message|| 'invalid access token')
    }
})