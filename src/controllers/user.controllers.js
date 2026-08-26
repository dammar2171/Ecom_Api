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
    res.status(400).json({message:error.message});
  }
}

const updateProfile = async(req,res) =>{
    try {
    const updatedProfile = await userServices.updateProfile(req.params.id,req.file);
    res.status(200).json(updatedProfile); 
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const updateUser = async(req,res)=>{
  try {
    const updatedUser = await userServices.updateUser(req.params.userId,req.body); 
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const deleteUser = async(req,res)=>{
  try {
    const deletedUser = await userServices.deleteUser(req.params.userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

export default {getUsers,getUserById,createUser,updateProfile,updateUser,deleteUser};