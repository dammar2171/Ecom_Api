import { ORDER_STATUS_CANCELLED, ORDER_STATUS_CONFIRMED, ORDER_STATUS_PENDING } from '../constants/order.js';
import Order from '../modals/Order.js'
import crypto from 'crypto';
import { ROLE_ADMIN } from '../constants/roles.js';

const getAllOrders = async()=>{
  return await Order.find().populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");;
}

const getOrderById = async(id,user)=>{
  const order = await Order.findById(id).populate("user", "name email phone").populate("orderItems.product", "name brand category price imageUrl");;
  if(!order){
    throw {
      statusCode:404,
      message:"Order not found."
    }
  }
  console.log(user.role)
  if (order.user.toString() != user._id && !user.role.includes(ROLE_ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  return order;
}

const createOrder = async(data,user)=>{
  console.log(data,user)
  const orderNumber = crypto.randomUUID();

  let shippingAddress = user.address;

  if(data?.shippingAddress){
    shippingAddress = data.shippingAddress;
  }

  return await Order.create({...data,user:user._id,orderNumber,shippingAddress});
}

const getAllOrdersByUser = async(user)=>{
  return await Order.find({user:user._id}).populate("user", "name email phone").populate("orderItems.product", "name brand category price imageUrl");
}

const cancelOrder = async(id,user)=>{
  const order = await getOrderById(id,user)
  if(!order){
    throw {
      statusCode:404,
      message:"Order not found."
    }
  }

  if(order.orderStatus !== ORDER_STATUS_PENDING){
    throw {
      message:"Order cannot be cancelled."
    }
  }
  return await Order.findByIdAndUpdate(id,{orderStatus:ORDER_STATUS_CANCELLED},{new:true})
}

const deleteOrder = async(id)=>{
  await Order.findByIdAndDelete(id)
  return {message:"Order deleted."}
}

const confirmOrder = async(id,user)=>{
  const order = await getOrderById(id,user)
  if(!order){
    throw {
      statusCode:404,
      message:"Order not found."
    }
  }

  if(order.orderStatus !== ORDER_STATUS_PENDING){
    throw {
      message:"Order cannot be cancelled."
    }
  }
  return await Order.findByIdAndUpdate(id,{orderStatus:ORDER_STATUS_CONFIRMED},{new:true})
}

const updateStatus = async(id,data)=>{
  return await Order.findByIdAndUpdate(
    id,
    { orderStatus: data.orderStatus },
    { new: true },
  );
}

export default {getAllOrders,getOrderById,createOrder,getAllOrdersByUser,cancelOrder,deleteOrder,confirmOrder,updateStatus};