const { add,destroy,fetchAll } = require("../services/itemFollowing")

post = async (req,res) =>{
    const {userId,params}    = req
    const {id}               = params
    try{
    const result = await add({userId,id})
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
    const {id}               = params
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



del = async (req,res) =>{
    const {userId,params}    = req
    const {id}               = params
    try{
    const result = await destroy({userId,id})
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
    del,
    getAll,
}