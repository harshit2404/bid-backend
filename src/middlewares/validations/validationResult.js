const {validationResult} = require('express-validator')

validateResult = (req,res,next)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        failureResponse({
            res:res,
            statusCode:400,
            message:errors.array()[0]
          
        })
     
     
    }
    else{
    return next()}
}


module.exports = {
    validateResult
}