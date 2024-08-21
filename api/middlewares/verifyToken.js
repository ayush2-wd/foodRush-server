const jwt = require('jsonwebtoken')


// middlewares
const verifytoken=(req,res,next)=>{
    // console.log(req.headers.authorization);
    if(!req.headers.authorization){
      return res.status(401).send({message:"unauthorised access"})
      
    }
    const token = req.headers.authorization.split(" ")[1];
      console.log(token)
      jwt.verify(token,process.env.ACCESS_TOKEN_SERVER,(err,decoded)=>
      {
        if(err){
          return res.status(401).send({message:"token is invalid "});
        }
        req.decoded = decoded;
        next();
      }
      )
  }

  module.exports = verifytoken;