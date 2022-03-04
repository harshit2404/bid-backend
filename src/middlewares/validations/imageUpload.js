const multer = require("multer")


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');

    },
    filename:function(req,file,cb){

        cb(null,Date.now()+"--"+file.originalname)

    },
   
})

const fileFilter = (req,file,cb)=>{

    if(file.mimetype==='image/jpeg'|| file.mimetype==='image/png'){
        console.log(file)
        cb(null,true)
    }
    else{
    cb( new Error('Image format is invalid'),true)
    
     
    }

}

const upload = multer({
    storage:storage,
    limits:{
        fileSize : 1024*1024*5
    },
    fileFilter:fileFilter,
   
   
})

const imageUpload =  upload.array("photoUrl")


uploadImage = (req,res,next)=>{
    imageUpload(req,res,(err)=>{
        if(err) console.log("error occured"+err)
        return next()
    })
}


module.exports = {
    uploadImage,
    
}