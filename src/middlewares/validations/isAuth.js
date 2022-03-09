const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
require('dotenv').config()


const { db } = require("../../models");
const { failureResponse } = require("../../utils/result");
const {User} = db



isAuth = async(req,res,next)=>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const err = new Error('Authentication required')
        err.statusCode = 401
        failureResponse({
            res:res,
            statusCode:err.statusCode,
            message:err.message,

        })

    }
  else{
    const token =  authHeader.split(' ')[1];
    let decodedToken;
    try{
         decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        failureResponse({
            res:res,
            message:err.message,
        
        })

    }
    if(!decodedToken){
        const error = new Error('Unauthorized Access')
        failureResponse({
            res:res,
            message:error.message,
            statusCode:401,
        
        })
        
    }
    else{
    const id = mongoose.Types.ObjectId(decodedToken.userId)    
    console.log(id)
    const user=await User.findOne({
        _id:id

    })   
    if(user.isActive==true){ 
    req.userId = decodedToken.userId
    next();
    }
    else{
        const error = new Error("User is not logged in! Please login first")
        failureResponse({
            res:res,
            statusCode:401,
            message:error.message,
        
        })
    }
}
}
}


module.exports = {
    isAuth,
   
}