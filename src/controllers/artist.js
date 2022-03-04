const { add,update,fetchOne,fetchAll } = require("../services/artist")
const { enhanceQuery } = require("../utils/queryEnhancer")



post = async (req,res) =>{
    const {body,params,files,userId,protocol,hostname} = req
    let {id} = params
    const {name,bio} = body
    
    try{
    const result = await add({name,bio,id,files,userId,protocol,hostname})
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
    const {body,files,userId,protocol,hostname} = req
    const {name,bio} = body
    try{
    const result = await update({name,bio,files,userId,protocol,hostname})
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
    const {id}     = params
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



module.exports = {
    post,
    put,
    getOne,
    getAll
}
