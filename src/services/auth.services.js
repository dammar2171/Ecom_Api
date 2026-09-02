import User from "../modals/User.js";
import bcrypt from 'bcrypt';
import config from '../config/config.js'
import sendEmail from "../utils/email.js";
import ResetPassword from "../modals/ResetPassword.js";

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

const forgotPassword =async(data)=>{
  const user = await User.findOne({email:data.email});

  if(!user){
    throw {
      statusCode:404,
      message:"User not found!"
    }
  }

  // forget password link
  /**
   * 1.create password model: userId,token,validity.
   * 2.create password link with userId and token.
   * 
   */
  const token = crypto.randomUUID();

  await ResetPassword.create({
    user:user._id,
    token
  })

  const resetPasswordlink = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;

  await sendEmail({
    to:user.email,
    subject:"Reset Password",
    html:`<h1>Hello ${user.name}</h1>
    <p>
      Please click the button below or use the following url to reset your
      password.
    </p>
    <button
      href=${resetPasswordlink}
      style="
        padding: 0.5rem 3rem;
        background-color: blue;
        color: white;
        font-size: 1.3rem;
        border: none;
      "
    >
      Reset
    </button>
    <p>
      Note: The url link is valid for 60 minute(s).
      <br />
      Thanks and Regards
      <br />
      Team Ecommerce
    </p>`
  })

  return {
    message:"Email sent successfully!"
  }
};
const resetPassword =async(input)=>{
  const data = await ResetPassword.findOne({
    user:input.user,
    expireAt: {$gt:Date.now()},
  }).sort({createdAt:-1});

  if(!data || data.token !== input.token){
    throw {
      message:"Invalid token or expired link"
    }
  }

  if(data.isUsed){
    throw {
      message:"Link already used."
    }
  }

  const SALT = 10;
  const hashedPassword = await bcrypt.hash(input.password,SALT);

  await User.findByIdAndUpdate(input.user,{
    password:hashedPassword
  });

  await ResetPassword.findByIdAndUpdate(data._id,{
    isUsed:true
  })

  return {
    message:"Password reset succussfully!"
  }
};

export default {login,register,forgotPassword,resetPassword};