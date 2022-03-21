const { fetchAll,fetchOne,add,update } = require("../services/comment")


post = async (req,res) =>{
    const {body,userId,params}   = req
    const {id}                   = params
    const {comment} = body
    try{
    const result = await add({comment,userId,id})
    response({
        res:res,
        statusCode:result.statusCode,
        message:result.message,
        data:result.data

    })
    
    }
    catch(err){
        failureResponse({
            res:res,
            statusCode:err.statusCode,
            message:err.message,
        
        })
        
    }
}    



getAll = async (req,res) =>{
    const {id}  = req.params

    try{
    const result = await fetchAll({id})
    response({
        res:res,
        statusCode:result.statusCode,
        message:result.message,
        data:result.data

    })
    
    }
    catch(err){
        failureResponse({
            res:res,
            statusCode:err.statusCode,
            message:err.message,
        
        })
        
    }
}   




getOne = async (req,res) =>{
    const {id,commentId}  = req.params

    try{
    const result = await fetchOne({id,commentId})
    response({
        res:res,
        statusCode:result.statusCode,
        message:result.message,
        data:result.data

    })
    
    }
    catch(err){
        failureResponse({
            res:res,
            statusCode:err.statusCode,
            message:err.message,
        
        })
        
    }
}   




put = async (req,res) =>{
    const{body,params,userId}    = req
    const {id,commentId}  =params
    const {comment}       = body

    try{
    const result = await update({comment,id,commentId,userId})
    response({
        res:res,
        statusCode:result.statusCode,
        message:result.message,
        data:result.data

    })
    
    }
    catch(err){
        failureResponse({
            res:res,
            statusCode:err.statusCode,
            message:err.message,
        
        })
        
    }
}   


module.exports = {
    post,
    getAll,
    getOne,
    put
}