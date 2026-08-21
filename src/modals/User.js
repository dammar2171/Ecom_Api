import mongoose, { Types } from "mongoose";

const userModel = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"User name is required."],
    min:3,
    max:50,
  },
  email:{
    type:String,
    required:[true,"Email is required."],
    min:6,
    max:100,
    unique:true,
    trim:true,
    lowercase:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please filled a valid email address."]
  },
  password:{
    type:String,
    required:[true,"Password is required."],
  },
  phone:{
    type:String,
    required:[true,"Phone number is required."],
    min:6,
    max:15,
    unique:true
  },
  address:{
    city:{
      type:String,
      required:[true,"City required."],
    },
    province:String,
    tole:String
  },
  role:{
    type:String,
    enum:["COSTUMER","MERCHANT","ADMIN","SUPER_ADMIN"],
    default:"COSTUMER",
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  }
});

export default new mongoose.model("User",userModel);