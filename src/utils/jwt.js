import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (payload) =>{
  const token = jwt.sign(payload,config.jwt_secret,{
    expiresIn:"1d",
  })
  return token;
}

const verifyToken = (token) =>{
  const data = jwt.verify(token,config.jwt_secret);

  return data;
}

export default {generateToken, verifyToken};