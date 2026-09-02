import mongoose from "mongoose";
import { boolean } from "zod";

const resetPasswordModel = mongoose.Schema({
  user:{
    type:mongoose.Schema.ObjectId,
    required:true,
    ref:"User"
  },
  token:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  expireAt:{
    type:Date,
    default:Date.now() + 60 * 60 * 1000,
  },
  isUsed:{
    type:boolean,
    default:false
  }
})

export default mongoose.model("ResetPassword",resetPasswordModel)