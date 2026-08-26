import mongoose from "mongoose";
import { emailRegex } from "../constants/regex.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_MERCHANT } from "../constants/roles.js";
import { string } from "zod";

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
    match:[emailRegex,"Please filled a valid email address."]
  },
  password:{
    type:String,
    required:[true,"Password is required."],
    min:6,
    max:100
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
    enum:[ROLE_CUSTOMER,ROLE_MERCHANT,ROLE_ADMIN],
    default:"CUSTOMER",
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  isActive:{
    type:Boolean,
    default:true,
  },
  profileImageUrl:String
});

export default new mongoose.model("User",userModel);