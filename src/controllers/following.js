const { add,destroy } = require("../services/following")

post = async (req,res) =>{
    console.log('hrry')
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
}