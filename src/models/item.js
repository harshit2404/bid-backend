const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema =  new Schema({
    name:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    bitStartTime:{
        type:Date,
        required:false
    },
    bitEndTime:{
        type:Date,
        required:false
    },
    
    bidStatus:{
        type:Boolean,
        required:true,
        default:'CREATED'
    },
    finalBidId:{
        type:String,
        required:false
    
    },
    artist:{
        type:Schema.Types.ObjectId,
        ref: 'Artist',
        required:false

    }

});




module.exports = mongoose.model("Item",ItemSchema)