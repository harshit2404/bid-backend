const {mongoose} = require('mongoose')


const { db } = require("../../models")
const { failureResponse } = require("../../utils/result")
const {User} = db


isAuthorize=(perm)=>{

    return async (req,res,next)=>{
    const rolePermissions = {
        "ROLE_ADMIN":["MANAGE_AUCTION","MANAGE_ARTIST","UPDATE_CREATE_ITEM"],
        "ROLE_USER":[""],
        "ROLE_ARTIST":["UPDATE_CREATE_ITEM"],
    }
    const {userId} = req

   const user= await User.findOne({
        _id:mongoose.Types.ObjectId(userId)

    })

   const {role} = user
   let hasPermission;
   for(let permission of rolePermissions[role]){
    if(permission===perm){
        hasPermission = true
    }}
    if(hasPermission){
        return next()
    }
    else{
        const error = new Error("UnAuthorized Access")
        error.statusCode = 401
        failureResponse({
         res:res,
         statusCode:error.statusCode,
         message:error.message,
     })
    }
    



}
}



module.exports = {
    isAuthorize
}