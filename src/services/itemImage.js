const mongoose = require('mongoose')
require('dotenv').config()
const fs = require('fs')

const { db } = require("../models")
const {ItemImage} = db

add = async({id,files,protocol,host})=>{
    const itemid = mongoose.Types.ObjectId(id)
    const imgArr=files.map(file=>{
        let path = file.path
        path   = path.replace('\\','/')
        return{
            photoUrl:protocol+"://"+host+':'+`${process.env.PORT||3000}`+'/'+path,
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
 //   fs.unlink( "uploads/24-dabur-chyawanprash.png",(err=>{if(err)console.log(err)}))
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