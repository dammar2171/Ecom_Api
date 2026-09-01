import orderServices from "../services/order.services.js";

const getAllOrders = async(req,res)=>{
  try {
    const data = await orderServices.getAllOrders();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const getOrderById = async(req,res)=>{
  try {
    const data = await orderServices.getOrderById(req.params.id,req.user);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 400).json({message:error.message})
  }
}

const createOder = async(req,res)=>{
  try {
    const data = await orderServices.createOrder(req.body,req.user);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const getAllOrdersByUser =async(req,res)=>{
  try {
    const data = await orderServices.getAllOrdersByUser(req.user)
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const cancelOrder =async(req,res)=>{
  try {
    const data = await orderServices.cancelOrder(req.params.id,req.user)
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 400).json({message:error.message})
  }
}

const deleteOrder =async(req,res)=>{
  try {
    const data = await orderServices.deleteOrder(req.params.id)
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const confirmOrder =async(req,res)=>{
  try {
    const data = await orderServices.confirmOrder(req.params.id,req.user)
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}


const updateStatus=async(req,res)=>{
  try {
    const data = await orderServices.updateStatus(req.params.id,req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}


export default {getAllOrders, getOrderById,createOder,getAllOrdersByUser,cancelOrder, deleteOrder,confirmOrder,updateStatus};