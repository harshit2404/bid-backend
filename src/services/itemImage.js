const mongoose = require('mongoose')

const { db } = require("../models")
const {ItemImage} = db


add = async({files,params})=>{
    const itemid = mongoose.Types.ObjectId(params.id)
    
    const imgArr=files.map(file=>{
        return{
            photoUrl:file.path,
            item:itemid
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

fetchAll = async ({params})=>{
    const itemId = mongoose.Types.ObjectId(params.id)
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

destroy = async({params})=>{
    const imgId = mongoose.Types.ObjectId(params.imgId)
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