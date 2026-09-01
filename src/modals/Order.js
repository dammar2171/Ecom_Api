import mongoose from "mongoose";
import { ORDER_STATUS_CONFIRMED, ORDER_STATUS_DELIVERED, ORDER_STATUS_PENDING, ORDER_STATUS_SHIPPED } from "../constants/order.js";

const OrderModel = mongoose.Schema({
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  orderItems:[{
    product:{
      type:mongoose.Schema.ObjectId,
      ref:"Product",
      required:true
    },
    quantity:{
      type:Number,
      default:1,
      min:1
    }
  }],
  shippingAddress:{
    city:{
      type:String,
      required:true,
    },
    province:String,
    street:String,
    country:{
      type:String,
      required:true,
    }
  },
  orderStatus:{
    type:String,
    default:"PENDING",
    enum:[ORDER_STATUS_PENDING,ORDER_STATUS_CONFIRMED,ORDER_STATUS_SHIPPED,ORDER_STATUS_DELIVERED]
  },
  orderNumber:String,
  totalPrice:{
    type:Number,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    required:true,
  }
})

export default mongoose.model("Order",OrderModel);