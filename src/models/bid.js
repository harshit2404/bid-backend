
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
   userId:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required:true

   },
   itemId:{
       type:Schema.Types.ObjectId,
       ref: 'Item',
       required:true,
   }

},{
    toObject: {virtuals:true},
    toJSON: {virtuals:true}
   });

BidSchema.pre('save',function(next){
    this.modifiedAt = Date.now()
    next()
})


BidSchema.virtual('user',{
    ref:'User',
    localField:'userId',
    foreignField:'_id',
})


BidSchema.virtual('item',{
    ref:'Item',
    localField:'itemId',
    foreignField:'_id',
})



module.exports = mongoose.model("Bid",BidSchema)