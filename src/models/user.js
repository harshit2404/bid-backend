const mongoose = require('mongoose')
const bcrypt= require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema =  new Schema({
    username:{
        type:String,
        unique:true,
        required:false,
        default:null
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:false,
        default:null
    },
    role:{
        type:String,
        default:'ROLE_USER'
    
    },
    stripePaymentId:{
        type:String,
        required:false
    },
    isActive:{
        type:Boolean,
        default:true
    }

});



UserSchema.pre('save',async function(next){
    const hashed_password = await bcrypt.hash(this.password,10)
    this.password = hashed_password
    next()
})

module.exports = mongoose.model("User",UserSchema)