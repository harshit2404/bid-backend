const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env)
const uri = process.env.MONGODB_URL;
console.log(uri)
console.log('hrry')


mongoConnect = (app)=>{mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(result=>{
    console.log('connected')
    app.listen(3000,()=>{
        console.log('server started')
    })
})
.catch(err=>{
    console.log("error ocuured"+err)
})
}

module.exports = {
    mongoConnect
}