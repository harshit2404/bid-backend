const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemImageSchema =  new Schema({
    photoUrl:{
        type:String,
        required:true,
    },
    itemId:{
        type:Schema.Types.ObjectId,
        ref: 'Item',
        required:true
    },
    uploadedAt:{
        type:Date,
        required:true,
        default:Date.now
    }

},{
    toObject: {virtuals:true},
    toJSON: {virtuals:true}
   });



ItemImageSchema.virtual('item',{
    ref:'Item',
    localField:'itemId',
    foreignField:'_id',
})



module.exports = mongoose.model("ItemImage",ItemImageSchema)