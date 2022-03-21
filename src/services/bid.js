const { mongoose } = require("mongoose");
const webpush    = require('web-push')

const { db } = require("../models");
const {Bid,Subscriber,Notification}  = db



notifyUser = async({id,bid,userId})=>{

    
    const highestBid=await Bid.find({
        itemId:mongoose.Types.ObjectId(id)
    }).select().sort({'bidAmount':-1}).limit(2)
    
    if(bid._id.equals(highestBid[0]._id)){
        console.log('yooo')
      
        const highestBidSubscriberSubscription = await Subscriber.find({
            userId:mongoose.Types.ObjectId(highestBid[0].userId)
        })
        if(highestBidSubscriberSubscription.length>0){
            
  const payload = JSON.stringify({ title: "Congrats! You are the highest bid holder" });
  for await(sub of highestBidSubscriberSubscription){
    await webpush
    .sendNotification(sub, payload)
    
  }
        }
        
    
  const message = "You are the highest bid holder"
  const notification = new Notification({
      message,
      userId:highestBid[0].userId
  })
  await notification.save()
  const highestBidUserId = highestBid[0].userId.toString()
  console.log(highestBidUserId)
  io.in(highestBidUserId).emit("response",JSON.stringify(notification))

       if(highestBid[1]){
        const lastHighestBidHolderId = highestBid[1].userId
        console.log(lastHighestBidHolderId)
        const subscription=await Subscriber.find({
            userId:mongoose.Types.ObjectId(lastHighestBidHolderId)
        })
        console.log(subscription)
        console.log(userId)
        if(subscription.length>0){
            
 
  const payload = JSON.stringify({ title: "You were outbid" });
  for await(sub of subscription){
    await webpush
    .sendNotification(sub, payload)
    

  }

  /*
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
        }
    }
*/}

const message = "You were outbid"
const notification = new Notification({
    message,
    userId:highestBid[1].userId
})
await notification.save()
console.log(typeof(highestBid[1].userId))
const lastHighestBidUserId = highestBid[1].userId.toString()
io.in(lastHighestBidUserId).emit("response",JSON.stringify(notification))

}}

}

add = async ({bidAmount,userId,id})=>{
    console.log(id)
    let bid=await Bid.findOne({
        userId:mongoose.Types.ObjectId(userId),
        itemId:mongoose.Types.ObjectId(id)
    })
    if(bid){
        const error      = new Error("You alreadyy bid for this item!Please update your previous bid")
        error.statusCode = 400
        throw error
    }
    else{
    bid = new Bid({
        bidAmount,
        userId:userId,
        itemId:id

    })
    await bid.save()
    await notifyUser({id,bid,userId})

    const result= {
        statusCode:201,
        message:"Bid Added Successfully",
        data:bid,
    }
    return result
}
}



update = async({bidAmount,userId,id})=>{

    const bid = await Bid.findOne({
        userId:mongoose.Types.ObjectId(userId),
        itemId:mongoose.Types.ObjectId(id)
    })
    
    bid.bidAmount = bidAmount
    await bid.save()
    notifyUser({id,bid,userId})
    const result= {
        statusCode:200,
        message:"Bid Updated Successfully",
        data:bid,
    }
    return result


}

fetchItem = async({id})=>{

    const bids=await Bid.find({
        itemId:mongoose.Types.ObjectId(id)

    })

    const result= {
        statusCode:200,
        message:"Bids fetched Successfully",
        data:bids
    }
    return result

}

fetchCurrent = async({userId,id})=>{
    let message;
    const currentBid = await Bid.findOne({
        itemId:mongoose.Types.ObjectId(id),
        userId:mongoose.Types.ObjectId(userId)
    })
    const highestBid=await Bid.find({
        itemId:mongoose.Types.ObjectId(id)
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
        itemId:mongoose.Types.ObjectId(id)
    }).select().sort({'bidAmount':-1}).limit(1)
    console.log(bid)
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
    fetchHighest,
    
}