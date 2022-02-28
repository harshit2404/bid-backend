const mongoose = require('mongoose')

const { db } = require("../models")
const {Item,ItemImage} = db

add = async({id,files})=>{
    const itemid = mongoose.Types.ObjectId(id)
    const imgArr=files.map(file=>{
        return{
            photoUrl:file.path,
            itemId:itemid
        }
    })
    const images=await ItemImage.insertMany(imgArr) 
    const result= {
        statusCode:200,
        message:"Images added Successfully",
        data:images,
    }
    return result
    }

fetchAll = async ({id})=>{
    const itemId = mongoose.Types.ObjectId(id)
    const images=await ItemImage.find({
        itemId:itemId
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