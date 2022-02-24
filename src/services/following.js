const {  mongoose } = require("mongoose")

const { db } = require("../models")
const {Following} = db

add = async({id,userId})=>{
    let following;
    following  = await Following.findOne({
        user:mongoose.Types.ObjectId(userId),
        artist:mongoose.Types.ObjectId(id)
    })
    console.log(following)
    if(following){
        const error = new Error('You already followed this user')
        error.statusCode = 400
        throw error
    }
    following  = new Following({
        user:userId,
        artist:id
    })
    await following.save()
    const result= {
        statusCode:201,
        message:"Followed Successfully",
        data:following,
    }
    return result
    

}

destroy = async({id,userId})=>{
    let following;
    following  = await Following.findOne({
        user:userId,
        artist:id
    })
    if(!following){
        const error = new Error('You already not following this user')
        artist.statusCode = 400
        throw error
    }
    await Following.deleteOne({
        user:mongoose.Types.ObjectId(userId),
        artist:mongoose.Types.ObjectId(id)
    })
    const result= {
        statusCode:200,
        message:"Unfollowed Successfully",
        data:0,
    }
    return result

}

module.exports = {
    add,
    destroy,
}