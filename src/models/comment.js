
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema =  new Schema({
    comment:{
        type:String,
        required:true,
        
    },
    placedAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        required:false,
    },
   userId:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required:true

   },
   postId:{
       type:Schema.Types.ObjectId,
       ref: 'Item',
       required:true,
   }

},{
    toObject: {virtuals:true},
    toJSON: {virtuals:true}
   });

CommentSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})


CommentSchema.virtual('user',{
    ref:'User',
    localField:'userId',
    foreignField:'_id',
})


CommentSchema.virtual('post',{
    ref:'Item',
    localField:'postId',
    foreignField:'_id',
})



module.exports = mongoose.model("Comment",CommentSchema)