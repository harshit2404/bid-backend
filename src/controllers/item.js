const { add,fetchAll,fetchOne,fetchLoggedInUser,update,updateAuctionOrSold } = require("../services/item")


post = async (req,res) =>{
    const {body,userId} = req
    const {name,description,bidStartTime,bidEndTime} = body
    try{
    const result = await add({name,description,bidStartTime,bidEndTime,userId})
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
    const {bidStatus} = req.query
    try{
    const result = await fetchAll({bidStatus})
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
    const {params} = req
    let {id} = params

    try{
    const result = await fetchOne({id})
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




getLoggedInUser = async (req,res) =>{
    const {userId} = req
    try{
    const result = await fetchLoggedInUser({userId})
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
    const {body,userId,params} = req
    let {id} = params
    const {name,description,bidStartTime,bidEndTime} = body
    try{
    const result = await update({name,description,bidStartTime,bidEndTime,userId,id})
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



putAuctionOrSold = async (req,res) =>{
    const {body,params} = req
    let {id} = params
    const {bidStatus} = body
    try{
    const result = await updateAuctionOrSold({id,bidStatus})
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
    put,
    getLoggedInUser,
    putAuctionOrSold,
    
}