const { add,fetchAll,fetchOne,update } = require("../services/address")


post = async (req,res) =>{
    const {body,userId} = req
    const {address1,address2,address3,city,state,country,postalcode} = body
    try{
    const result = await add({address1,address2,address3,city,state,country,postalcode,userId})
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
    let {id} = req.params
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
    const{address1,address2,address3,city,country,postalcode} = body
    try{
    const result = await update({id,address1,address2,address3,city,country,postalcode,userId})
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
    getOne,
    put,
}