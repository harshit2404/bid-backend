customError = {
    
EmptyValue:{
    code:"P-FF-1",
    field:"Value",
    message:"Can't be an empty field"
},

InvalidEmail:{
    code:"P-FF-2",
    field:"email",
    message:"Invalid email address"

},

InvalidPassword:{
    code:"P-FF-3",
    field:"value",
    message:"Password must include one lowercase letter,one uppercase character,a number and a  special character"

},

InvalidFormat:{
   code:"P-FF-6",
   field:"value",
   message:"Invalid Format"
},

InvalidType:({msg})=>{
    return{
        code:"P-FF-4",
        field:"value",
        message:msg
    }

},


InvalidLength:({msg})=>{
    return{
    code:"P-FF-5",
    field:"Value",
    message:msg 
    }
},



}

module.exports = {
    customError
}