
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowingSchema =  new Schema({
    
    artist:{
        type:Schema.Types.ObjectId,
        ref: 'Artist',
        required:true,
    },
   
   user:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required:true

   },

   followedAt:{
    type:Date,
    required:false,
    default:Date.now()
},
   

});




module.exports = mongoose.model("Following",FollowingSchema)