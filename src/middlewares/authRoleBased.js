const authRoleBased = (req,res,next) =>{
  if(req.user?.role !== "ADMIN"){
    res.status(401).json({
      message:"Unauthorized role!"
    })
    return;
  }
  next();
}

export default authRoleBased;