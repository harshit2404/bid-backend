const express = require('express');
const router = express.Router()


const { post,getAll,del } = require('../controllers/itemImage');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');



router.post('/items/:id/image',isAuth,uploadImage,post)
router.get('/items/:id/image',isAuth,getAll)
router.delete('/items/:id/image/:imgId',isAuth,del)




module.exports = router