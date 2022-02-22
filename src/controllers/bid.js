const { add,update,fetchItem,fetchCurrent,fetchHighest } = require("../services/bid")



post = async (req,res) =>{
    const {body,params,userId} = req
    const {id}          = params
    const {bidAmount} = body
    try{
    const result = await add({bidAmount,userId,id})
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
    const {params,body,userId} = req
    let {id} = params
    const{bidAmount} = body
    try{
    const result = await update({bidAmount,userId,id})
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



getItem = async (req,res) =>{
    const {id} = req.params
    try{
    const result = await fetchItem({id})
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



getCurrent = async (req,res) =>{
    const {params,userId} = req
    const {id}            = params
    try{
    const result = await fetchCurrent({id,userId})
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




getHighest = async (req,res) =>{
    const {params} = req
    const {id}            = params
    try{
    const result = await fetchHighest({id})
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
    put,
    getItem,
    getCurrent,
    getHighest
}