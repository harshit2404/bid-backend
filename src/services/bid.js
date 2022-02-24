const { mongoose } = require("mongoose");
const { db } = require("../models");
const {Bid}  = db


add = async ({bidAmount,userId,id})=>{
    console.log(userId)
    let bid=await Bid.findOne({
        user:mongoose.Types.ObjectId(userId),
        item:mongoose.Types.ObjectId(id)
    })
    console.log(bid)
    if(bid){
        const error      = new Error("You alreadyy bid for this item!Please update your previous bid")
        error.statusCode = 400
        throw error
    }
    bid = new Bid({
        bidAmount,
        user:userId,
        item:id

    })
    await bid.save()
    const result= {
        statusCode:201,
        message:"Bid Added Successfully",
        data:bid,
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
        data:bid,
    }
    return result


}

fetchItem = async({id})=>{

    const bids=await Bid.find({
        item:mongoose.Types.ObjectId(id)

    }).populate('user')

    const result= {
        statusCode:200,
        message:"Bids fetched Successfully",
        data:bids,
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
    }).select('bidAmount').sort({'bidAmount':-1}).limit(1)
    
    if(currentBid.bidAmount<highestBid.bidAmount){
        message = 'You were outbid'
    }
    else{
        message='You are currently highest bid holder'
    }

    const result= {
        statusCode:200,
        message:message,
        data:currentBid
    }
    return result

}


fetchHighest = async({id})=>{

    const bid=await Bid.find({
        item:mongoose.Types.ObjectId(id)
    }).select('bidAmount').sort({'bidAmount':-1}).limit(1).populate('user')
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