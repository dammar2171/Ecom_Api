const logger = (req,res,next)=>{
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();
  console.log(`Protocol-> ${req.protocol} : URL-> ${req.url} : Time-> ${time} : Date-> ${date}`)

  next();
}

export default logger;