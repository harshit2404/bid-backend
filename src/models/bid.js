
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BidSchema =  new Schema({
    bidAmount:{
        type:Number,
        required:true,
        get:v=>(v/100).toFixed(2),
        set:v=>v*100
        
    },
    bidPlacedAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    modifiedAt:{
        type:Date,
        required:false,
    },
   user:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required:true

   },
   item:{
       type:Schema.Types.ObjectId,
       ref: 'Item',
       required:true,
   }

});

BidSchema.pre('save',function(next){
    this.modifiedAt = Date.now()
    next()
})



module.exports = mongoose.model("Bid",BidSchema)