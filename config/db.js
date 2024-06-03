const { default: mongoose } = require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/personal_finance',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
};
module.exports=connectDB;