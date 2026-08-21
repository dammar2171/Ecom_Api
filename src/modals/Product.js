import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Product name is required."]
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
    required:[true,"Product price is required."]
  },
  description:String,
  imageUrl:[{
    type:String
  }],
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

export default new mongoose.model("Product",productModel);