const express = require('express');
const router = express.Router()


const { getAll ,getOne} = require('../controllers/post');
const { isAuth } = require('../middlewares/validations/isAuth');




router.get('/post',isAuth,getAll)
router.get('/posts/:id',isAuth,getOne)

module.exports  = router