const { add,fetchAll,fetchOne,update } = require("../services/address")


post = async (req,res) =>{
    const {body,userId} = req
    try{
    const result = await add({body,userId})
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
    try{
    const result = await fetchAll()
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
    try{
    const result = await fetchOne({params})
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
    try{
    const result = await update({params,body,userId})
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
}