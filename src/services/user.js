const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const { db } = require("../models");
const {Address,User,Artist} = db


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
        throw error

        
        
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


fetchAll = async({modQuery})=>{
    console.log(modQuery)
    const {query,sort,limit,skip} =  modQuery
    const users = await User.find(query).sort(sort).limit(limit).skip(skip).select('-password')
    console.log(query)
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

fetchAddress = async({id})=>{

  const addresses=  await Address.findOne({
        userId:mongoose.Types.ObjectId(id)

    })
    const result= {
        statusCode:200,
        message:"Addresses fetched Successfully",
        data:addresses
    }
    return result


}

fetchArtist = async({id})=>{

   const artist= await Artist.findOne({
        artistId:mongoose.Types.ObjectId(id)
    })
    const result= {
        statusCode:200,
        message:"Artist fetched Successfully",
        data:artist
    }
    return result 

}


forgotPassword = async({email})=>{
    const user =  await User.findOne({
            email:email
        })
    
    if(user){
        const secret = process.env.JWT_SECRET + user.password
        const payload = {
            email:user.email,
            id:user.id
        }
        const token = jwt.sign(payload,secret,{expiresIn:'15m'})
        const link  = `http://localhost:${process.env.PORT||3000}/reset-password/${user.id}/${token}`

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_AUTH_USER, // generated ethereal user
              pass: process.env.SMTP_AUTH_USER_PASSWORD, // generated ethereal password
            },
          });

          let info = await transporter.sendMail({
            from: '"John Carter" <carterjohn2404@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reset Password link", // Subject line
            html: `<b>Reset your password</b>
                    <a href=${link}>Reset</a>
            `, // html body
          });  

          
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        const result= {
            statusCode:200,
            message:`Link sended successfully to provided ${email}`,
            data:true
        }
        return result

    }
   else{
       const error = new Error("User doesn't exist")
       error.statusCode = 400
       throw error
   } 
 

}


resetPassword = async({id,token,password})=>{
    const user =  await User.findOne({
        _id:mongoose.Types.ObjectId(id),
    })
    if(!user){
        const error = new Error("User doesn't exist")
        error.statusCode = 400
        throw error

    }
    const secret  = process.env.JWT_SECRET + user.password
    const decodedToken = jwt.verify(token,secret)

    if(decodedToken){
     console.log(decodedToken)
     const {id,email} = decodedToken
     const user =  await User.findOne({
        _id:mongoose.Types.ObjectId(id),
        email:email
    }) 
    user.password = password
    await user.save()
    const result= {
        statusCode:200,
        message:'password changed successfully',
        data:user
    }
    return result

    }
    else{
        const error = new Error('Invalid Token')
        error.statusCode = 400
        throw error
    }



}

module.exports = {
    add,
    login,
    fetchAll,
    fetchOne,
    update,
    updatePassword,
    fetchAddress,
    fetchArtist,
    forgotPassword,
    resetPassword,
}