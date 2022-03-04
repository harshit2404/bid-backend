const mongoose = require('mongoose')

const { db } = require("../models");
const {Artist,User,Item} = db



add = async({name,bio,id,files,protocol,hostname})=>{
    

    let artist=await Artist.findOne({
        userId:mongoose.Types.ObjectId(id)
    })
    if(artist){
        const error      = new Error('User is already an artist!')
        error.statusCode = 400
        throw error 
    }
    else{
        const session = await mongoose.startSession()
        try{
        session.startTransaction()    
        if(await Artist.findOne({name})){
            const error      = new Error('Artist name already taken')
            error.statusCode = 400
            throw error
        }
        console.log('kjk')
        console.log(artist)
        let path = files[0].path
        path   = path.replace('\\','/')
        artist = new Artist({
            name,
            bio,
            photoUrl:protocol+"://"+hostname+':'+`${process.env.PORT||3000}`+'/'+path,
            userId:mongoose.Types.ObjectId(id)

         }) 
        
        await artist.save({session}) 
        console.log(artist)
        await User.findOneAndUpdate(
        {
            _id:mongoose.Types.ObjectId(id)

        } ,
        {
            role:"ROLE_ARTIST"
        },
        {
            session
        }   
        )
        console.log(artist)
        await session.commitTransaction();
        await session.endSession();
        
        const result= {
            statusCode:200,
            message:"Artist added Successfully",
            data:artist,

        }
        return result

    }catch(err){
        await session.abortTransaction()
        throw err
    }}
    

}


update = async ({name,bio,files,id,protocol,hostname})=>{   
    let path = files[0].path
    path   = path.replace('\\','/')
    const artist=await Artist.findOne({
        _id:mongoose.Types.ObjectId(id)
    })
    artist.name     = name
    artist.bio      = bio
    artist.photoUrl = protocol+"://"+hostname+':'+`${process.env.PORT||3000}`+'/'+path,
    await artist.save()

    const result= {
        statusCode:200,
        message:"Artist updated Successfully",
        data:artist,

    }
    return result

}


fetchOne = async ({id})=>{
    const artist=await Artist.findOne({
        _id:mongoose.Types.ObjectId(id)
    })
    const result= {
        statusCode:200,
        message:"Artist fetched Successfully",
        data:artist,

    }

    return result
    
}


fetchAll = async({modQuery})=>{
    const {query,sort,limit,skip} =  modQuery
    console.log(query)
    const artists = await Artist.find(query).sort(sort).limit(limit).skip(skip)
    const result= {
        statusCode:200,
        message:"Artists fetched Successfully",
        data:artists,
    }
    return result
}

fetchItems = async({id})=>{
   const items= await Item.find({
        artistId:mongoose.Types.ObjectId(id)
    })
    const result= {
        statusCode:200,
        message:"Items fetched Successfully",
        data:items,
    }
    return result
}


    


module.exports = {
add,
update,
fetchOne,
fetchAll,
fetchItems,
}