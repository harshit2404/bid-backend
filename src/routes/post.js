const express = require('express');
const router = express.Router()


const { getAll ,getOne} = require('../controllers/post');





router.get('/posts',getAll)
router.get('/posts/:id',getOne)

module.exports  = router