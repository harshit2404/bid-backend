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
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

},{
    toObject: {virtuals:true},
    toJSON: {virtuals:true}
   });


AddressSchema.virtual('user',{
    ref:'User',
    localField:'userId',
    foreignField:'_id',
})



module.exports = mongoose.model("Address",AddressSchema)