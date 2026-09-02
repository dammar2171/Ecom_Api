import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Product name is required."],
    min:3,
    max:50
  },
  brand:{
    type:String,
    required:[true,"Product brand name is required."]
  },
  category:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:[true,"Product price is required."],
    min:1,
    max:99999999
  },
  stock:{
    type:Number,
    default:1
  },
  description:String,
  imageUrl:[String],
  createdAt:{
    type:Date,
    default:Date.now()
  },
  createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  }
});

export default mongoose.model("Product",productModel);