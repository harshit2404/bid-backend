const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtistSchema =  new Schema({
    name:{
        type:String,
        required:true,
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
   }

});



module.exports = mongoose.model("Artist",ArtistSchema)