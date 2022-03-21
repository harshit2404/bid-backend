const { add } = require("../services/subscriber")


post = async (req,res) =>{
    const {userId} = req
    const subscription = req.body

    try{
    const result = await add({userId,subscription})
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
}