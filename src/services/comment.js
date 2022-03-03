const {mongoose } = require("mongoose")


const { db } = require("../models")
const {Comment} = db




add = async({comment,userId,id})=>{
    const userComment = new Comment({
        comment,
        postId:id,
        userId:userId
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
        postId:mongoose.Types.ObjectId(id),
    
    })
    console.log(comments)

    const result= {
        statusCode:200,
        message:"Comments fetched Successfully",
        data:comments,
    }
    return result    

}

fetchOne = async({id,commentId})=>{
    console.log(id)
    console.log(commentId)
    const comment = await Comment.findOne({
        postId:mongoose.Types.ObjectId(id),
        _id :mongoose.Types.ObjectId(commentId)
    
    })
    console.log('heey')
    console.log(comment)

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
        postId:mongoose.Types.ObjectId(id),
        userId:mongoose.Types.ObjectId(userId)

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