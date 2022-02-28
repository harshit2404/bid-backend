
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemFollowingSchema =  new Schema({
    
    itemId:{
        type:Schema.Types.ObjectId,
        ref: 'Artist',
        required:true,
    },
   
   userId:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required:true

   },

   followedAt:{
    type:Date,
    required:false,
    default:Date.now()
},
   

},{
    toObject: {virtuals:true},
    toJSON: {virtuals:true}
   });


ItemFollowingSchema.virtual('user',{
    ref:'User',
    localField:'userId',
    foreignField:'_id',
})


ItemFollowingSchema.virtual('item',{
    ref:'Item',
    localField:'itemId',
    foreignField:'_id',
})




module.exports = mongoose.model("ItemFollowing",ItemFollowingSchema)