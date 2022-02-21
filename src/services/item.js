const mongoose = require('mongoose')

const { db } = require("../models")
const {Item,Artist,ItemImage} = db

add = async({body})=>{
    const {name,description} = body
    const item = new Item({
        name,
        description,
    
    })
    await item.save()
    const result= {
        statusCode:201,
        message:"Item added Successfully",
        data:item,
    }
    return result
}



fetchAll = async()=>{
    const items=await Item.find({}).populate('artist')
    const result= {
        statusCode:200,
        message:"Items fetched Successfully",
        data:items,
    }
    return result
}


fetchOne = async({params})=>{
    const itemId=mongoose.Types.ObjectId(params.id)
    const item = await Item.findOne({
        _id:itemId,
    }).populate('artist')


    const result= {
        statusCode:200,
        message:"Artist fetched Successfully",
        data:item,
    }
    return result
}

update = async({params,body})=>{
    const {name,description} = body
    const item = Item.findOne({
        _id:params.id
    })
    item.name = name
    item.description = description
    await item.save()
    const result= {
        statusCode:200,
        message:"Item updated Successfully",
        data:item,
    }
    return result

}

destroy = async ({params})=>{
    const itemId = mongoose.Types.ObjectId(params.id)
    const session = await mongoose.startSession()
    try{
        await session.startTransaction()
        const artist=Item.findOne({
            _id:itemId
        })
        await ItemImage.findOneAndDelete({
            item:itemId
        },{session})
        await Artist.findOneAndDelete({
            _id:artist.id
        },{session})
        await Item.findOneAndDelete({
            _id:itemId
        },{session})

        await session.commitTransaction()
        await session.endSession()

        const result= {
            statusCode:200,
            message:"Item deleted Successfully",
            data:0,
        }
        return result
        

    }
    catch(err){
        await session.abortTransaction()
        throw err
    }
}

module.exports = {
    add,
    fetchAll,
    fetchOne,
    update,
    destroy,
    
}