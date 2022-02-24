const { fetchAll,fetchOne } = require("../services/post")
const { enhanceQuery } = require("../utils/queryEnhancer")


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
    const {id} = req.params
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

module.exports = {
    getAll,
    getOne,
}