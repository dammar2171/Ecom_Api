import Product from "../modals/Product.js"
import uploadFiles from "../utils/fileUploader.js";
const getAllProducts = async(query) =>{
  
  // sorting
  const limit = query?.limit;
  const sort = query?.sort ? JSON.parse(query.sort) : null;
  const offset = query?.offset;

  // filtering
  const filters={};
  if(query?.brands) filters.brand = {$in:query?.brands.split(",")};
  if(query?.category) filters.category = query?.category;
  if(query?.name) filters.name = {$regex:query?.name, $options:"i"} //case insensitive
  
  const products = await Product.find(filters).limit(limit).sort(sort).skip(offset);
  if(!products){
    throw {
      statusCode:404,
      message :"Products not found!"
    }
  }
  return products
}

const getBrands = async()=>{
  const brands = await Product.distinct("brand");
  if(!brands){
    throw {
      statusCode:404,
      message:"No brands found!"
    }
  }
  return brands;
}

const getCategories = async()=>{
  const category = await Product.distinct("category");
  if(!category){
    throw {
      statusCode:404,
      message:"No category found!"
    }
  }
  return category;
}

const getProductById = async(id) =>{
  const product = await Product.findOne({_id:id});

  if(!product){
    throw {
      statusCode:404,
      message:"Product not found!"
    }
  }
  
  return product;
}

const updateProduct = async(productId,data,userId,files)=>{
  const product = await Product.findOne({_id:productId});

  if(!product){
    throw {
      statusCode:404,
      message:"Product not found!"
    }
  }

  if(product.createdBy.toString() !== userId){
    throw {
      statusCode:401,
      message:"Unauthorized!"
    }
  }
  const updatedData = data;
  if(files && files.length > 0){
    const uploadedFiles = await uploadFiles(files);
    updatedData.imageUrl = uploadedFiles.map((item)=> item.url)
  }
  
  return await Product.findByIdAndUpdate(productId,updatedData,{new:true})
}

const deleteProduct = async(productId,userId)=>{
  const product = await Product.findOne({_id:productId});

  if(!product){
    throw { message:"Product not found!" }
  }

  if(product.createdBy.toString() !== userId){
    throw { message:"Unauthorized!"}
  }

 return await Product.deleteOne({_id:productId});
}

const createProduct = async(input,files,userId) =>{
  const uploadedFiles = await uploadFiles(files);
  const product = await Product.create({...input,imageUrl:uploadedFiles.map((item)=> item.url),createdBy:userId})
  return product;
}
export default {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct,getBrands,getCategories};