const authRoleBased = (role)=>(req,res,next) =>{
  if (req.user.role.includes(role)) return next();

  res.status(403).json({ message: "Access denied." });
}

export default authRoleBased;