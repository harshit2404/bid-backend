customError = {
    
EmptyValue:({field})=>{
    return{
    code:"P-FF-1",
    field:field,
    message:"Can't be an empty field"
}},

InvalidEmail:{
    code:"P-FF-2",
    field:"email",
    message:"Invalid email address"

},

InvalidPassword:{
    code:"P-FF-3",
    field:"password",
    message:"Password must include one lowercase letter,one uppercase character,a number and a  special character"

},

InvalidFormat:({field})=>{
    return {
   code:"P-FF-6",
   field:field,
   message:"Invalid Format"
}},

InvalidType:({msg,field})=>{
    return{
        code:"P-FF-4",
        field:field,
        message:msg
    }

},


InvalidLength:({msg,field})=>{
    return{
    code:"P-FF-5",
    field:field,
    message:msg 
    }
},




}

module.exports = {
    customError
}