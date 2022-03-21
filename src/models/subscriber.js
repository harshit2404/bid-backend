const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscriberSchema =  new Schema({
    endpoint:{
        type:String,
        required:true
    },
    keys:Schema.Types.Mixed,
    createdAt:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:false

    } 

});



module.exports = mongoose.model("Subscriber",SubscriberSchema)