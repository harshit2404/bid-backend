const { default: mongoose } = require("mongoose")
const { db } = require("../models")

const {Notification} = db

fetchAll = async({userId})=>{
    console.log('hello')
    console.log(userId)
    const notifications=await Notification.find({
        userId:mongoose.Types.ObjectId(userId)
    })
    console.log(notifications)

    const result= {
        statusCode:200,
        message:"Notifications fetched  Successfully",
        data:notifications,
    }

    return result

}


module.exports = {
    fetchAll,
}