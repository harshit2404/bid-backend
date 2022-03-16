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


fetchAll  = async({id})=>{
   const followers= await ItemFollowing.find({
    itemId:mongoose.Types.ObjectId(id)
    })

   const result= {
    statusCode:201,
    message:" Item follower list fetched Successfully",
    data:{
        followedBy:followers,   
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