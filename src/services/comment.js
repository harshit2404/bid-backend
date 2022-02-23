const {mongoose } = require("mongoose")


const { db } = require("../models")
const {Comment,Item} = db




add = async({comment,userId,id})=>{
    const userComment = new Comment({
        comment,
        post:id,
        user:userId
    })
    await userComment.save()
    const result= {
        statusCode:201,
        message:"Comment added Successfully",
        data:userComment,
    }
    return result

}

fetchAll = async({id})=>{

    const comments = await Comment.find({
        post:mongoose.Types.ObjectId(id),
    
    }).populate('user','-password')

    const result= {
        statusCode:200,
        message:"Comments fetched Successfully",
        data:comments,
    }
    return result    

}

getOne = async({id,commentId})=>{
    const comment = await Comment.fetchOne({
        post:mongoose.Types.ObjectId(id),
        _id :mongoose.Types.ObjectId(commentId)
    
    })

    const result= {
        statusCode:200,
        message:"Comment fetched Successfully",
        data:comment,
    }
    return result 

}

update= async({comment,id,commentId,userId})=>{
    const userComment = await Comment.findOne({
        _id:mongoose.Types.ObjectId(commentId),
        post:mongoose.Types.ObjectId(id),
        user:mongoose.Types.ObjectId(userId)

    })
    if(userComment){
        userComment.comment = comment
        await userComment.save()
    const result= {
        statusCode:200,
        message:"Comment Updated Successfully",
        data:userComment,
    }
    return result 
}
    else{
        const error = new Error("Ýou are not authorized to update it")
        error.statusCode = 400
        throw error
    }

}


module.exports = {
    add,
    fetchAll,
    fetchOne,
    update
}