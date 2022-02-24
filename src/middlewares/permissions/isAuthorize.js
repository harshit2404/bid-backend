const {mongoose} = require('mongoose')


const { db } = require("../../models")
const { failureResponse } = require("../../utils/result")
const {User} = db


isAuthorize=(perm)=>{
    return async (req,res,next)=>{
    const rolePermissions = {
        "ROLE_ADMIN":["MANAGE_AUCTION"],
        "ROLE_USER":[""]
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
        console.log('sd')
        return next()
    }
    else{
        const error = new Error("UnAuthorized Access")
        error.statusCode = 401
        failureResponse({
         res:res,
         statusCode:statusCode,
         message:error.message,
     })
    }
    



}
}



module.exports = {
    isAuthorize
}