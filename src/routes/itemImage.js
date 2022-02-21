const express = require('express');
const router = express.Router()


const { post,getAll,del } = require('../controllers/itemImage');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');



router.post('/item/:id/image',isAuth,uploadImage,post)
router.get('/item/:id/image',isAuth,getAll)
router.delete('/item/:id/image/:imgId',isAuth,del)




module.exports = router