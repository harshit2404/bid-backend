const { add,fetchAll,destroy } = require("../services/itemImage")


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



getAll = async (req,res) =>{
    const {params} = req
    try{
    const result = await fetchAll({params})
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
    const {params} = req
    try{
    const result = await destroy({params})
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
    del,
}