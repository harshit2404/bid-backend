const { add, login, fetchAll, fetchOne, update,updatePassword } = require("../services/user");
const { response,failureResponse } = require("../utils/result");


signup = async (req,res) =>{
    const {body} = req
    try{
    const result = await add({body})
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



signin = async (req,res) =>{
    const {body} = req
    try{
    const result = await login({body})
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
    const result = await fetchAll({query})
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


putPassword = async (req,res) =>{
    const {params,body,userId} = req
    try{
    const result = await updatePassword({params,body,userId})
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
    signup,
    signin,
    getAll,
    getOne,
    put,
    putPassword,
}



