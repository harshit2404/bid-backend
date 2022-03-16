const {  mongoose } = require("mongoose")
const { db } = require("../models")



const {ItemFollowing} = db


add = async({id,userId})=>{
    const following = new ItemFollowing({
        itemId:mongoose.Types.ObjectId(id),
        userId:mongoose.Types.ObjectId(userId)
    })
    await following.save()
    const result= {
        statusCode:201,
        message:" Item followed Successfully",
        data:following,
    }
    return result

}


fetchAll  = async({id,userId})=>{
   const itemId   = mongoose.Types.ObjectId(id) 
   let isFollowing
   const followers= await ItemFollowing.find({
    itemId,
    })

    const userFollowed = await ItemFollowing.findOne({
        userId:mongoose.Types.ObjectId(userId),
        itemId     
    })

    if(userFollowed){
        isFollowing=true
    }
    else{
        isFollowing=false
    }


   const result= {
    statusCode:201,
    message:" Item follower list fetched Successfully",
    data:{
        followedBy:followers,   
        isFollowing,
    },
}
return result

}


destroy = async({id,userId})=>{
    await ItemFollowing.deleteOne({
        itemId:mongoose.Types.ObjectId(id),
        userId:mongoose.Types.ObjectId(userId)
    })
    const result= {
        statusCode:200,
        message:" Item unfollowed Successfully",
        data:0,
    }
    return result


}

module.exports = {
    add,
    fetchAll,
    destroy
}