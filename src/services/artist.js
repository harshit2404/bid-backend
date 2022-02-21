const mongoose = require('mongoose')

const { db } = require("../models");
const {Artist,Item} = db



add = async({params,body,files})=>{
    const session = await mongoose.startSession()
    try{
    session.startTransaction()    
    const {name,bio} = body
    const artist = new Artist({
        name,
        bio,
        photoUrl:files[0].path
    })
  await artist.save({session})  
  const itemId   = mongoose.Types.ObjectId(params.id)
  const item=await Item.findOneAndUpdate({_id:itemId},{$set:{artist:artist._id}},{session})
  await session.commitTransaction();
  session.endSession();

  const result= {
    statusCode:200,
    message:"Artist added Successfully",
    data:item,
}

  return result  
    }catch(err){
        await session.abortTransaction()
        throw err
    }

}


update = async({body,params,files})=>{
    const artistId=mongoose.Types.ObjectId(params.artistId)
    const {name,bio} = body
    const artist=await Artist.findOne({
        _id:artistId,
    })
    artist.name     = name
    artist.bio      = bio
    artist.photoUrl = files[0].path
    artist.save()
    
    const result= {
        statusCode:200,
        message:"Artist updated Successfully",
        data:artist,
    }
    return result

}
module.exports = {
add,
update,
}