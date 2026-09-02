import dotenv from 'dotenv';

dotenv.config();

const config = {
  appUrl:process.env.APP_URL || " ",
  port:process.env.PORT || 5000,
  db_port:process.env.DATABASE_PORT || "",
  host:process.env.HOST || " ",
  jwt_secret:process.env.JWT_SECRET || " ",
  cloudinary:{
    name:process.env.CLOUDINARY_CLOUD_NAME || " ",
    apikey:process.env.CLOUDINARY_API_KEY || " ",
    apiSecret:process.env.CLOUDINARY_API_SECRET || " ",
  },
  resendApiKey:process.env.RESEND_API_KEY || " ",
}

export default config;