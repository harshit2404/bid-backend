
const mongoose = require('mongoose')
require('dotenv').config()

const fs = require('fs')


const db = {}

const files=fs.readdirSync(__dirname)


files.forEach(file=>{
    if(file==='index.js'
    ) return;
    const model = require(`./${file}`)
    db[model.modelName] = model
  
   
})
console.log(db)




module.exports = {
    db,
    
}

