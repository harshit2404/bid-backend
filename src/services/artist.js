const mongoose = require('mongoose')

const { db } = require("../models");
const {Artist} = db



add = async({name,bio,id,files,userId})=>{

    let artist=await Artist.findOne({
        user:mongoose.Types.ObjectId(userId)
    })
    if(artist){
        const error      = new Error('User is already an artist!')
        error.statusCode = 400
        throw error 
    }
    else{
        artist = new Artist({
            name,
            bio,
            id,
            photoUrl:files[0].path,
            user:userId

         }) 
        await artist.save()
        
        const result= {
            statusCode:200,
            message:"Artist added Successfully",
            data:artist,

        }
        return result

    }

}


update = async ({name,bio,files,userId})=>{

    const artist=await Artist.findOne({
        user:userId
    })
    artist.name     = name
    artist.bio      = bio
    artist.photoUrl = files[0].path 
    await artist.save()

    const result= {
        statusCode:200,
        message:"Artist updated Successfully",
        data:artist,

    }
    return result

}


fetch = async ({userId})=>{
    const artist=await Artist.findOne({
        user:mongoose.Types.ObjectId(userId)
    })
    const result= {
        statusCode:200,
        message:"Artist fetched Successfully",
        data:artist,

    }

    return result
    
}
    


module.exports = {
add,
update,
fetch
}