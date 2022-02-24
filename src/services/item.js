const mongoose = require('mongoose')

const { db } = require("../models")
const {Item,Artist} = db

add = async({name,description,userId})=>{
    const artist=await Artist.findOne({
        user:mongoose.Types.ObjectId(userId)
    })
    console.log(artist)
    if(artist){ 
    const item = new Item({
        name,
        description,
        artist:artist._id,
    
    })

    await item.save()
    const result= {
        statusCode:201,
        message:"Item added Successfully",
        data:item,
    }
    return result
}
    else{
        const error      = new Error("Please add an artist first")
        error.statusCode = 400
        throw error

}


}



fetchAll = async({modQuery})=>{
    const {query,sort,limit} =  modQuery
    const items = await Item.find(query).sort(sort).limit(limit)
    const result= {
        statusCode:200,
        message:"Items fetched Successfully",
        data:items,
    }
    return result
}

fetchLoggedInUser = async({userId})=>{
    const artist = await  Artist.findOne({
        user:mongoose.Types.ObjectId(userId)
    })
    const items  = await  Item.find({
        artist:mongoose.Types.ObjectId(artist._id)

    }).populate('artist')
    const result= {
        statusCode:200,
        message:"User Items fetched Successfully",
        data:items,
    }
    return result
}


fetchOne = async({id})=>{
    const itemId=mongoose.Types.ObjectId(id)
    const item = await Item.findOne({
        _id:itemId,
    }).populate('artist')

    const result= {
        statusCode:200,
        message:"Artist fetched Successfully",
        data:item,
    }
    return result
}

update = async({name,description,userId,id})=>{
    const artist = await Artist.findOne({
        user:mongoose.Types.ObjectId(userId)
    })
    const item   =   await Item.findOne({
        _id:mongoose.Types.ObjectId(id)
    }).populate('artist')
    const {artist:itemArtist} = item
  
    if(!itemArtist._id.equals(artist._id)){
        const error      = new Error('You are not authorized to update this')
        error.statusCode = 401
        throw error
    }
    if(item.bidStatus=='CREATED'){
    const updatedItem=await Item.findOneAndUpdate({
        _id:id
    },{
        name,
        description,

    },{
        new:true
    })
    const result= {
        statusCode:200,
        message:"Item updated Successfully",
        data:updatedItem,
    }
    return result
    
}
else{
    const error      = new Error('You cannot update an item in "auction or sold" status')
    error.statusCode = 400
    throw error

}
    

}

updateAuctionOrSold = async({id,bidStatus,bidStartTime,bidEndTime})=>{
   
    const item=await Item.findOneAndUpdate({
        _id:id
    },{
        bidStatus,
        bidStartTime,
        bidEndTime,
    },{
        new:true
    })
    const result= {
        statusCode:200,
        message:"Item status updated Successfully",
        data:item,
    }
    return result


}

module.exports = {
    add,
    fetchAll,
    fetchOne,
    update,
    updateAuctionOrSold,
    fetchLoggedInUser,
    
}