const {customError}   = require('./customError')
const {InvalidFormat} = customError

response = (obj)=>{

    res = obj.res
    res.status(obj.statusCode).json({
       message:obj.message,
       data:obj.data
    

    })
    
    
}


failureResponse = (obj)=>{
    if(!obj.statusCode){
        obj.statusCode = 500
    }
    if(!obj.message){
        obj.message="Something went wrong with server"
    }
    res = obj.res
   
    if(obj.error){
        res.status(obj.statusCode).json({error:obj.error})
    }
    res.status(obj.statusCode).json({error:{message:obj.message}})
  
}


module.exports = {
   response,
   failureResponse
}