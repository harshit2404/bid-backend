
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowingSchema =  new Schema({
    
    artistId:{
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


FollowingSchema.virtual('user',{
    ref:'User',
    localField:'userId',
    foreignField:'_id',
})


FollowingSchema.virtual('artist',{
    ref:'Artist',
    localField:'artistId',
    foreignField:'_id',
})




module.exports = mongoose.model("Following",FollowingSchema)