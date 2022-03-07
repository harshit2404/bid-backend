const {  mongoose } = require("mongoose")

const { db }   = require("../models")
const { Item } = db 



fetchAll = async({modQuery})=>{
    const {query,sort,limit,skip} =  modQuery
    query.bidStatus = 'AUCTION'
    const items = await Item.find(query).sort(sort).limit(limit).skip(skip)
    const result= {
        statusCode:200,
        message:"Items fetched Successfully",
        data:items,
    }
    return result
}

 
 
fetchOne = async({id})=>{
 
     const post = await Item.findOne({
         _id:mongoose.Types.ObjectId(id),
         bidStatus:'AUCTION'
     })
 
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