const mongoose = require('mongoose')

const { db } = require("../models");
const {Address} = db


add = async ({body,userId})=>{

    const {address1,address2,address3,city,state,country,postalcode} = body
    const address = new Address({
        address1,
        address2,
        address3,
        city,
        state,
        country,
        postalcode,
        user:userId,
        
    })

    await address.save()
    const result= {
        statusCode:201,
        message:"Address added Successfully",
        data:address
    }
    return result 

}


fetchAll = async()=>{
    const addresses=await Address.find({}).populate('user')
    const result= {
        statusCode:200,
        message:"Addresses fetched Successfully",
        data:addresses,
    }
    return result
}

fetchOne = async({params})=>{
    const userId=mongoose.Types.ObjectId(params.id)
    const address = await Address.find({
        user:userId,
    })
    .populate('user')

    console.log(address)

    const result= {
        statusCode:200,
        message:"Address fetched Successfully",
        data:address,
    }
    return result
}

update = async({params,body,userId})=>{

   userId    = mongoose.Types.ObjectId(userId)
   const addressId = mongoose.Types.ObjectId(params.id)
   const{address1,address2,address3,city,country,postalcode} = body
   const address=await Address.findOne({
       _id:addressId
   }).populate('user')
   const {user} = address
   if(userId.equals(user._id))
   {
       address.address1   = address1,
       address.address2   = address2,
       address.address3   = address3,
       address.state      = state,
       address.city       = city,
       address.country    = country,
       address.postalcode = postalcode
       await address.save()
       const result= {
        statusCode:200,
        message:"Address updated Successfully",
        data:address,
    }
    return result

   }
   else{
       const error      = new Error("you are not authorized to update this.")
       error.statusCode = 401
       throw error
   }

}

module.exports = {
    add,
    fetchAll,
    fetchOne,
    update,
}