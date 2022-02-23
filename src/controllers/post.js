const { fetchAll,fetchOne } = require("../services/post")

getAll = async (req,res) =>{
    console.log('harry')
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