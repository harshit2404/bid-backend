const { mongoose } = require("mongoose");
const { db } = require("../models/item");
const {Bid}  = db


add = async ({bidAmount,userId,id})=>{
    const bid = new Bid({
        bidAmount,
        user:userId,
        item:id

    })
    await bid.save()
    const result= {
        statusCode:201,
        message:"Bid Added Successfully",
        data:updatedItem,
    }
    return result

}

update = async({bidAmount,userId,id})=>{

    const bid = await Bid.findOne({
        user:mongoose.Types.ObjectId(userId),
        item:mongoose.Types.ObjectId(id)
    })
    
    bid.bidAmount = bidAmount
    await bid.save()
    const result= {
        statusCode:200,
        message:"Bid Updated Successfully",
        data:updatedItem,
    }
    return result


}

fetchItem = async({id})=>{

    const bids=await Bid.find({
        item:mongoose.Types.ObjectId(id)

    }).populate('user').count()

    const result= {
        statusCode:200,
        message:"Bids fetched Successfully",
        data:updatedItem,
    }
    return result

}

fetchCurrent = async({userId,id})=>{
    let message;
    const currentBid = await Bid.findOne({
        item:mongoose.Types.ObjectId(id),
        user:mongoose.Types.ObjectId(userId)
    })
    const highestBid=await Bid.find({
        item:mongoose.Types.ObjectId(id)
    }).select('bidAmount').sort('bidAmount',-1).limit(1)
    
    if(currentBid.bidAmount<highestBid.bidAmount){
        message = 'You were outbid'
    }
    else{
        message='You are currently highest bid holder'
    }

    const result= {
        statusCode:200,
        message:message,
        data:updatedItem,
    }
    return result

}


fetchHighest = async({id})=>{

    const bid=await Bid.find({
        item:mongoose.Types.ObjectId(id)
    }).select('bidAmount').sort('bidAmount',-1).limit(1).populate('user')
    const result= {
        statusCode:200,
        message:"Highest Bid fetched Successfully",
        data:bid,
    }
    return result


}


module.exports = {
    add,
    update,
    fetchItem,
    fetchCurrent,
    fetchHighest
}