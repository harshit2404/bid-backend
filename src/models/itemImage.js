const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemImageSchema =  new Schema({
    photoUrl:{
        type:String,
        required:true,
    },
    item:{
        type:Schema.Types.ObjectId,
        ref: 'Item',
        required:true
    },
    photoUrl:{
        type:String,
        required:true
    },
    uploadedAt:{
        type:Date,
        required:true,
        default:Date.now
    }

});



module.exports = mongoose.model("ItemImage",ItemImageSchema)