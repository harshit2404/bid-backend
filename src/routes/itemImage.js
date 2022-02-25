const express = require('express');
const router = express.Router()


const { post,getAll,del } = require('../controllers/itemImage');
const { isAuthorize } = require('../middlewares/permissions/isAuthorize');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');



router.post('/items/:id/image',isAuth,isAuthorize("UPDATE_CREATE_ITEM"),uploadImage,post)
router.get('/items/:id/image',isAuth,getAll)
router.delete('/items/:id/image/:imgId',isAuthorize("UPDATE_CREATE_ITEM"),isAuth,del)




module.exports = router