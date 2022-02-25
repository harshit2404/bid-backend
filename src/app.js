const express = require('express')


const {mongoConnect} = require('./db/mongoose')


const app = express()


app.use(express.json())
app.use(express.urlencoded())
app.use(express.urlencoded({extended:true}))


require('./routes/index')(app)
mongoConnect(app)