import Product from "../modals/Product.js"
const getAllProducts = async() =>{
  const products = await Product.find();

  return products
}

const getProductById = async(id) =>{
  const product = await Product.findOne({_id:id});
  
  return product;
}

const updateProduct = async(productId,input,userId)=>{
  const product = await Product.findOne({_id:productId});

  if(!product){
    throw {
      message:"Product not found!"
    }
  }

  if(product.createdBy.toString() !== userId){
    throw {
      message:"Unauthorized!"
    }
  }
  return await Product.findByIdAndUpdate(productId,input,{new:true})
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

const createProduct = async(input,userId) =>{
  const product = await Product.create({...input,createdBy:userId})
  return product;
}
export default {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct};