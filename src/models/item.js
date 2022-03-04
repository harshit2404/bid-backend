const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ItemSchema =  new Schema({
    name:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    bidStartTime:{
        type:Date,
        required:false,
        default:null
    },
    bidEndTime:{
        type:Date,
        required:false,
        default:null
    },
    
    bidStatus:{
        type:String,
        required:true,
        default:'CREATED'
    },
    finalBidId:{
        type:String,
        required:false
    
    },
    artistId:{
        type:Schema.Types.ObjectId,
        ref: 'Artist',
        required:false

    }

},{
    toObject: {virtuals:true},
    toJSON: {virtuals:true}
   });




ItemSchema.virtual('images',{
    ref:'ItemImage',
    localField:'_id',
    foreignField:'itemId',
    autopopulate:true,
})



ItemSchema.virtual('artist',{
    ref:'Artist',
    localField:'artistId',
    foreignField:'_id',
})

/*
ItemSchema.virtual('img').get(function(){
    const { db } = require('.');
    const {ItemImage} = db
    ItemImage.find({
    itemId:this._id
},function(err,doc){
    console.log(doc)
    return doc
})
})

*/


module.exports = mongoose.model("Item",ItemSchema)