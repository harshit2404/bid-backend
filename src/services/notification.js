const { default: mongoose } = require("mongoose")
const { db } = require("../models")

const {Notification} = db

fetchAll = async({userId})=>{
    const notifications=await Notification.find({
        userId:mongoose.Types.ObjectId(userId)
    })

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