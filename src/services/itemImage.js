const mongoose = require('mongoose')

const { db } = require("../models")
const {Item,ItemImage} = db


add = async({id,files})=>{
    const itemid = mongoose.Types.ObjectId(id)
    const session = await mongoose.startSession()
    const imgArr=files.map(file=>{
        return{
            photoUrl:file.path,
            item:itemid
        }
    })
 
    try{
    session.startTransaction()    
    const images=await ItemImage.insertMany(imgArr,{session})
    const insertedImgArr=images.map((img)=>{
        return img._id

    })
   
    
   await Item.findOneAndUpdate({_id:itemid},{$set:{images:insertedImgArr}},{session})
   await session.commitTransaction();
   session.endSession();
    const result= {
        statusCode:200,
        message:"Images added Successfully",
        data:images,
    }
    return result
    }catch(err){
    await session.abortTransaction()
    throw err
    }
   

}

fetchAll = async ({id})=>{
    const itemId = mongoose.Types.ObjectId(id)
    const images=await ItemImage.find({
        item:itemId
    })


    const result= {
        statusCode:200,
        message:"Images fetched Successfully",
        data:images,
    }

    return result

}

destroy = async({imgId})=>{
    imgId = mongoose.Types.ObjectId(imgId)
    await ItemImage.deleteOne({
        _id:imgId
    })
    const result= {
        statusCode:200,
        message:"Image deleted Successfully",
        data:0,
    }

    return result


}


module.exports = {
    add,
    fetchAll,
    destroy,
}