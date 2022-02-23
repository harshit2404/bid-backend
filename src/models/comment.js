
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
   user:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required:true

   },
   post:{
       type:Schema.Types.ObjectId,
       ref: 'Item',
       required:true,
   }

});

CommentSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})



module.exports = mongoose.model("Comment",CommentSchema)