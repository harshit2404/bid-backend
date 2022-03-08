const {validationResult} = require('express-validator')

validateResult = (req,res,next)=>{

    const errors = validationResult(req)
    const errArr = errors.array()
    console.log(errArr)
    if(!errors.isEmpty()){
       const error= errArr.map(err=>{
          return err.msg
       })
        failureResponse({
            res:res,
            statusCode:400,
            error:error[0]
          
        })
     
     
    }
    else{
    return next()}
}


module.exports = {
    validateResult
}