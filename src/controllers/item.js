const { add,fetchAll,fetchOne,fetchLoggedInUser,update,updateAuctionOrSold } = require("../services/item")
const { enhanceQuery } = require("../utils/queryEnhancer")


post = async (req,res) =>{
    const {body,userId} = req
    const {name,description} = body
    try{
    const result = await add({name,description,userId})
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
    const {query} = req
    try{
    const modQuery=await enhanceQuery({query})    
    const result = await fetchAll({modQuery})
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
    const {name,description} = body
    try{
    const result = await update({name,description,userId,id})
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
    const {bidStatus,bidStartTime,bidEndTime} = body
    try{
    const result = await updateAuctionOrSold({id,bidStartTime,bidEndTime,bidStatus})
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