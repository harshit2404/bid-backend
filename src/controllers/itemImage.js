const { add,fetchAll,destroy } = require("../services/itemImage")


post = async (req,res) =>{
    const {params,files,protocol,host} = req
    let {id}           = params
    try{
    const result = await add({id,files,protocol,host})
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
    console.log(req.hostname)
    console.log(req)
    const {params} = req
    let {id}     = params
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
    const {params} = req
    let {imgId}    = params
    try{
    const result = await destroy({imgId})
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