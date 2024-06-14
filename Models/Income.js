import mongoose from "mongoose";
import { Schema } from "mongoose";

const incomeSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
},{timestamps:true});
export const Income=mongoose.model('Income',incomeSchema)

