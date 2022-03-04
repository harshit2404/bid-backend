const express = require('express');
const router = express.Router()


const { post,getAll,del } = require('../controllers/itemImage');
const { isAuthorize } = require('../middlewares/permissions/isAuthorize');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');



router.post('/items/:id/images',isAuth,uploadImage,post)
router.get('/items/:id/images',isAuth,getAll)
router.delete('/items/:id/images/:imgId',del)




module.exports = router