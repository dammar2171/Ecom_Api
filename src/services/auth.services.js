import User from "../modals/User.js";
import bcrypt from 'bcrypt';

const login = async(input) =>{
  const user = await User.findOne({$or:[{email:input.email},{phone:input.phone}]});

  if(!user){
    throw {
      message:"User not found!"
    }
  }
  // password comparing
  const isPasswordMatched = await bcrypt.compare(input.password,user.password);

  if(!isPasswordMatched){
    throw {
      message:"Password do not matched"
    }
  }

  return {
    _id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    role:user.role
  }
}

const register = async(input) =>{

  const SALT = 10;
  // hashed password
  const hashedPassword = await bcrypt.hash(input.password,SALT);

  const data = await User.insertOne({
    name:input.name,
    email:input.email,
    password:hashedPassword,
    phone:input.phone,
    address:{
      city:input.address.city,
      province:input.address.province,
      tole:input.address.tole,
    }
  })
  return {
    _id:data._id,
    name:data.name,
    email:data.email,
    phone:data.phone,
    address:data.address,
    role:data.role
  }
}

export default {login,register};