import productServices from "../services/product.services.js"

const getAllProducts = async (req,res) =>{
  try {
    const products = await productServices.getAllProducts();

    res.status(200).json(products)
  } catch (error) {
    res.status(400).json({
      message:"Product fetching problem."
    })
  }
}

const getProductById = async (req,res) =>{
  
  try {
    const product = await productServices.getProductById(req.params.id);

    if(!product){
      res.status(404).json({message:"Product not found!"})
      return;
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({
      message:"Product fetching problem."
    })
  }
}

const updateProduct = async(req,res)=>{
  try {
    const updatedProduct = await productServices.updateProduct(req.params.id,req.body,req.user._id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const deleteProduct = async(req,res)=>{
  try {
    const data = await productServices.deleteProduct(req.params.id,req.user._id);
    
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({
      message:error.message,
    })
  }
}

const createProduct = async(req,res)=>{
  try {
    const createdProduct = await productServices.createProduct(req.body, req.user._id)
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(400).json({
      message:error.message
    })
  }
}

export default {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct};