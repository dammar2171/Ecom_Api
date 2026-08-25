import User from "../modals/User.js"
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

export default {getUsers, getUserById,createUser};