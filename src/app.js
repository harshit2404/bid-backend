const express = require('express')
const webpush = require('web-push')
const path    = require('path')
const cors    = require('cors')
require('dotenv').config()


const {mongoConnect} = require('./db/mongoose')


const app = express()

webpush.setVapidDetails(
    'mailto:budhlakotiharshit24@gmail.com',
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY
  );
  
app.use(express.static(path.join(__dirname,"client")))
app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



require('./routes/index')(app)
mongoConnect(app)