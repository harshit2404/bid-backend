const {  mongoose } = require("mongoose")

const { db }   = require("../models")
const { Item } = db 



fetchAll = async()=>{
    const posts= await Item.find({
         bidStatus:'AUCTION'
     }).populate('artist')
     const result= {
         statusCode:201,
         message:"Posts fetched Successfully",
         data:posts,
     }
     return result
 
 }
 
 
fetchOne = async({id})=>{
 
     const post = await Item.findOne({
         _id:mongoose.Types.ObjectId(id),
         bidStatus:'AUCTION'
     })
     console.log(post)
 
     const result= {
         statusCode:200,
         message:"Post fetched Successfully",
         data:post,
     }
     return result
 
 
 }


 module.exports = {
     fetchAll,
     fetchOne
 }