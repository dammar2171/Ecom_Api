import authServices from "../services/auth.services.js";
import jwtUtils from "../utils/jwt.js";
const login = async(req,res)=>{
  try {
    const data = await authServices.login(req.body);

    const token = jwtUtils.generateToken(data);
    res.cookie("authToken",token)
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const register = async(req,res)=>{
 try {
    const data = await authServices.register(req.body);

    const token = jwtUtils.generateToken(data);
    res.cookie("authToken",token,{
      maxAge: 86400 * 1000 //millisocond
    })
    res.status(200).json(token);
 } catch (error) {
  res.status(400).json({message:error.message})
 }
}

const logout = async(req,res)=>{
  try {
    res.clearCookie("authToken");
    res.json({message:"Logout successfull!"})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

export default {login,register,logout};