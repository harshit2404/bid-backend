const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
require('dotenv').config()

const { db } = require("../models");
const {User} = db

add = async({username,email,password,firstname,lastname,phoneNumber,stripePaymentId,isActive})=>{

   
    let user=await User.findOne({
        $or:[{username},{email}]
    }).exec()

    if(user){
        const error = new Error("User already exists with this email or username")
        error.statusCode = 400
        throw error
    }

    user = new User({
        username,
        email,
        password,
        firstname,
        lastname,
        phoneNumber,
        stripePaymentId,
    
        

    })
    
  
    await user.save()
    const result = {
        statusCode:201,
        message:"User created successfully",
        data:user
    }
    
    return result

}

login = async({email,password})=>{
   
    const user= await User.findOne({
        email,
    })
    if(!user){
        const error = new Error("Invalid credentials! User doesn't exist")
        error.statusCode = 401
        throw error

    }

    let isUserPassword=await bcrypt.compare(password,user.password)
    if(!isUserPassword){
        const error = new Error("Invalid Credentials! Wrong password")
        error.statusCode = 401
        throw  error
        
    }

    const token = await jwt.sign({email:email,userId:user.id},process.env.JWT_SECRET,{expiresIn:'1h'})
    if(token){
        await User.update({_id:mongoose.Types.ObjectId(user.id)},{
            isActive:true
        })
       
    }
    const result= {
        statusCode:201,
        message:"Logged in Successfully",
        data:{token:token}
    }
    return result 
    

    
}


fetchAll = async({query})=>{
    let users,limit;
    if(Object.keys(query).length===0){
     users = await User.find({}).select(['-password'])
    }
    else{
     if(query['limit']){        
        limit = parseInt(query['limit'])
        delete query['limit']
     }   
     users = await User.find(query).select(['-password']).limit(limit)
    }
    const result= {
        statusCode:200,
        message:"Users fetched Successfully",
        data:users
    }
    return result 
}

fetchOne = async({id})=>{
    id =  mongoose.Types.ObjectId(id); 
    const user = await User.findOne({
        _id:id
    })
    const result= {
        statusCode:200,
        message:"User fetched Successfully",
        data:user
    }
    return result 

}

update = async({id,username,email,firstname,lastname,phoneNumber,stripePaymentId,isActive,userId})=>{

    if(id!=userId){
        const error = new Error("you don't have access to update this record")
        error.statusCode = 400
        throw error
    }
    else{
        id = mongoose.Types.ObjectId(id)  
         
        const user = await User.findOneAndUpdate({
            _id:id
        },{
            username,
            email,
            firstname,
            lastname,
            phoneNumber,
            stripePaymentId,
            isActive
        },{
            new:true
        })
        const result= {
            statusCode:200,
            message:"User details updated Successfully",
            data:user
        }
        return result
    }
   

}

updatePassword = async({id,previousPassword,newPassword,userId})=>{
    
    if(id==userId){
        const user=await User.findOne({
            _id:id,
        })
        const isUserPassword=await bcrypt.compare(previousPassword,user.password)
        if(isUserPassword){
            user.password = newPassword
            user.active   = false
            await user.save()
            const result= {
                statusCode:200,
                message:"User Password updated Successfully",
                data:user
            }
            return result
        }
        else{
            const error      = new Error('Incorrect previous password')
            error.statusCode = 400
            throw error
        }

    }


}

module.exports = {
    add,
    login,
    fetchAll,
    fetchOne,
    update,
    updatePassword,
}