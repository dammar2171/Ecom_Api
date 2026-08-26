import express from 'express';
import config from './config/config.js';
import dotenv from 'dotenv';
import multer from 'multer';
import databaseConnect from './config/database.js';
import connectCloudinary from './config/cloudinary.js';

// routes import
import userRouters from './routes/user.routes.js';
import productRouters from './routes/product.routes.js';
import authRouters from './routes/auth.routes.js';
import logger from './middlewares/loggerMiddleware.js';

const app = express();
const upload = multer({storage:multer.memoryStorage(),limits:{fileSize:5000000}}) // 5mb
  

dotenv.config();

// database connection
databaseConnect();
// cloudinary connection
connectCloudinary();

// instead of body parser
app.use(express.json());

// logger middleware 
app.use(logger);

app.get("/",(req,res)=>{
  res.send("Server running successfully!")
})


// all routes
app.use("/api/users",upload.single("image"),userRouters);
app.use("/api/products",upload.array("images",5),productRouters);
app.use("/api/auth/",authRouters);

app.listen(config.port,()=>{
  console.log(`Server running on port ${config.port}...`);
})