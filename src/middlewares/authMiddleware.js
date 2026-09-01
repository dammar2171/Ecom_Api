import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authMiddleware = (req,res,next) =>{
  console.log(req.body)
  const authHeader = req.headers.cookie;  
  if(!authHeader){
    res.status(404).json({message:"Token missing!"})
    return;
  }
  const token = authHeader.split("=")[1];

  if(!token){
    throw {
      message:"Acess denied!"
    }
  }

  try {
    const decodedData = jwt.verify(token,config.jwt_secret);

    req.user = decodedData;

    next();
  } catch (error) {
    res.status(400).json( {
      message:"Token missing or expired!"
    })
  }
}

export default authMiddleware;