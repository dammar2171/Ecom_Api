import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config.js'

const connectCloudinary = () =>{
  cloudinary.config({
  cloud_name: config.cloudinary.name, 
  api_key: config.cloudinary.apikey, 
  api_secret: config.cloudinary.apiSecret
})

console.log("Cloudinary connected successfully!")
}

export default connectCloudinary;