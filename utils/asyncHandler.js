const asyncHandler=(requestHandler)=>{
   return async(req,res,next)=>{
    try{
        await Promise.resolve(requestHandler(req,res,next));
    }
    catch(error){
        const statusCode= error.statusCode || 500;
        const errorMessage=error.message || 'Interval server error'
        res.status(statusCode).json({
            success: false,
            error: errorMessage,
        })
    }
   }
};
export {asyncHandler}