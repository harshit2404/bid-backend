const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema =  new Schema({
    address1:{
        type:String,
        required:true,
    },
    address2:{
        type:String,
        required:true
    },
    address3:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    postalcode:{
        type:String,
        required:true
    
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

});



module.exports = mongoose.model("Address",AddressSchema)