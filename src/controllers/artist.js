const { add,update } = require("../services/artist")



post = async (req,res) =>{
    const {body,params,files} = req
    try{
    const result = await add({body,params,files})
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
    const {body,files,params} = req
    try{
    const result = await update({body,files,params})
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
}
