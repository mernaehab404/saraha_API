import jwt from "jsonwebtoken"

export const verifyToken= async(req,res,next)=>{
    let {token} =req.headers
    jwt.verify(token,"myNameMerna",async(err,decoded)=>{
        if(err) return res.status(401).json({message:"invalid token",err})
         req.user=decoded  
  next()
})
}