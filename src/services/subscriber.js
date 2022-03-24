const { db } = require("../models");

const {Subscriber} = db


add = async({userId,subscription})=>{
    
    subscription.userId = userId
    const subscribed=await Subscriber.findOne(subscription)
    if(subscribed){
        console.log('-----')
        const error = new Error("You are already subscribed with this device")
        error.statusCode = 400
        throw error
    }
    else{
    const subscriber = new Subscriber(subscription)
    await subscriber.save()
    const result= {
        statusCode:201,
        message:"SUbscribed Successfully",
        data:subscriber,
    }
    return result

}

}

module.exports = {
    add,
}