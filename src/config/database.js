import mongoose from "mongoose";
import config from "./config.js";
const databaseConnect = async() =>{
  try {
    await mongoose.connect(`mongodb://${config.host}:${config.db_port}/practiceDB`)
    console.log("Database connected successfully!")
  } catch (error) {
    console.log("DATABASE_ERROR:",error)
  }
}

export default databaseConnect;