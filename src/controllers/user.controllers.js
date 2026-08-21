import userServices from "../services/user.services.js";

const getUsers = async(req,res)=>{
  try {
    const users = await userServices.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const getUserById = async(req,res)=>{
  try {
    const id = req.params.userId;
    const user = await userServices.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const createUser = async(req,res)=>{
  try {
    const userCreated = await userServices.createUser(req.body);
    res.status(201).json(userCreated);
  } catch (error) {
    res.json({message:error.message});
  }
}
export default {getUsers,getUserById,createUser};