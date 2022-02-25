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
    bidStartTime:{
        type:Date,
        required:false,
        default:null
    },
    bidEndTime:{
        type:Date,
        required:false
    },
    
    bidStatus:{
        type:String,
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

    },
    images:[{ 
        type:Schema.Types.ObjectId,
        ref: 'ItemImage',
        required:false
        
    }]

});




module.exports = mongoose.model("Item",ItemSchema)