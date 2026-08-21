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
    const user = await User.create({
      name:input.name,
      email:input.email,
      phone:input.phone,
      address:{
        city:input.address.city,
        province:input.address.province,
        tole:input.address.tole,
      }
    })
    return user;
}

export default {getUsers, getUserById,createUser};