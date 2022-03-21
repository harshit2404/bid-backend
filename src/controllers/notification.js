const { fetchAll } = require("../services/notification")
const { enhanceQuery } = require("../utils/queryEnhancer")

getAll = async (req,res) =>{
    const {query,userId} = req
    try{
    const modQuery=await enhanceQuery({query})    
    const result = await fetchAll({userId,modQuery})
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
}