import User from "../modals/User.js"
import uploadFiles from "../utils/fileUploader.js";
const getUsers = async()=>{
  const users = await User.find({});
  return users;
}

const getUserById = async(id)=>{
  const user = await User.findById(id)
  return user;
}

const createUser = async(input)=>{
    const user = await User.create(input)
    return user;
}

const updateProfile =async(id,file)=>{
  const uploadedFile = await uploadFiles([file]);
  return await User.findByIdAndUpdate(id,{profileImageUrl:uploadedFile[0].url},{new:true});
}

const updateUser = async(id,data)=>{
  return await User.findByIdAndUpdate(id,data);
}

const deleteUser = async(id)=>{
  return await User.findByIdAndDelete(id);
}

export default {getUsers, getUserById,createUser,updateProfile,updateUser,deleteUser};