const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtistSchema =  new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    bio:{
        type:String,
        required:true
    },
    photoUrl:{
        type:String,
        required:true
    },
   stripeConnectId:{
       type:String,
       required:false
   },
   userId:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required:true

   }

});




module.exports = mongoose.model("Artist",ArtistSchema)