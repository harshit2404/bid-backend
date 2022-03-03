const express = require('express');
const router = express.Router()

const { post,getAll,getOne,put } = require('../controllers/comment');
const { isAuth } = require('../middlewares/validations/isAuth');


router.post('/posts/:id/comment',isAuth,post)
router.get('/posts/:id/comment',isAuth,getAll)
router.get('/posts/:id/comment/:commentId',isAuth,getOne)
router.put('/posts/:id/comment/:commentId',isAuth,put)



module.exports = router;