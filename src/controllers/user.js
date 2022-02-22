const { add, login, fetchAll, fetchOne, update,updatePassword } = require("../services/user");
const { response,failureResponse } = require("../utils/result");


signup = async (req,res) =>{
    const {body} = req
    const {username,email,password,firstname,lastname,phoneNumber,stripePaymentId,isActive} = body
    try{
    const result = await add({username,email,password,firstname,lastname,phoneNumber,stripePaymentId,isActive})
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
    const {email,password} = body
    try{
    const result = await login({email,password})
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
    let {id}     = params
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


put = async (req,res) =>{
    const {params,body,userId} = req
    let {id} = params
    const {username,email,firstname,lastname,phoneNumber,stripePaymentId,isActive} = body
    try{
    const result = await update({id,username,email,firstname,lastname,phoneNumber,stripePaymentId,isActive,userId})
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
    const {id} = params
    const {previousPassword,newPassword} = body
    try{
    const result = await updatePassword({id,previousPassword,newPassword,userId})
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



