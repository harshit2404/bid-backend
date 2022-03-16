const {  mongoose } = require("mongoose")

const { db } = require("../models")
const {Following} = db

/*
fetch = async({userId,id})=>{
    let isFollowing;
    const following=await Following.findOne({
        userId:mongoose.Types.ObjectId(userId),
        artistId:mongoose.Types.ObjectId(id)
    })
    if(following){
        isFollowing = true;
    }
    else{
        isFollowing=false;
    }
    const result= {
        statusCode:200,
        message:"Followed Successfully",
        data:{isFollowing,following},
    }
    return result

}*/


fetch = async({id,userId})=>{
    let isFollowing;
    const following=await Following.findOne({
        userId:mongoose.Types.ObjectId(userId),
        artistId:mongoose.Types.ObjectId(id)
    })
    if(following){
        isFollowing = true;
    }
    else{
        isFollowing=false;
    }   
    const followingList=await Following.find({
        artistId:mongoose.Types.ObjectId(id)
    })
    const result= {
        statusCode:200,
        message:"Artists following list fetched Successfully",
        data:{isFollowing,followingList}
    }
    return result   
}

add = async({id,userId})=>{
    let following;
    following  = await Following.findOne({
        userId:mongoose.Types.ObjectId(userId),
        artistId:mongoose.Types.ObjectId(id)
    })

    if(following){
        const error = new Error('You already followed this user')
        error.statusCode = 400
        throw error
    }
    else{
    following  = new Following({
        userId:userId,
        artistId:id
    })
    await following.save()
    const result= {
        statusCode:201,
        message:"Followed Successfully",
        data:following,
    }
    return result
}
    

}

destroy = async({id,userId})=>{
    let following;
    following  = await Following.findOne({
        userId:userId,
        artistId:id
    })
    if(!following){
        const error = new Error('You already not following this user')
        artist.statusCode = 400
        throw error
    }
    else{
    await Following.deleteOne({
        userId:mongoose.Types.ObjectId(userId),
        artistId:mongoose.Types.ObjectId(id)
    })
    const result= {
        statusCode:200,
        message:"Unfollowed Successfully",
        data:0,
    }
    return result
}

}

module.exports = {
    add,
    destroy,
    fetch,
}