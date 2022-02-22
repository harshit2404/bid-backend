const { add,update,fetch } = require("../services/artist")



post = async (req,res) =>{
    const {body,params,files,userId} = req
    let {id} = params
    const {name,bio} = body
    
    try{
    const result = await add({name,bio,id,files,userId})
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
    const {body,files,userId} = req
    const {name,bio} = body
    try{
    const result = await update({name,bio,files,userId})
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



get = async (req,res) =>{
    const {userId} = req
    try{
    const result = await fetch({userId})
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
    get
}
