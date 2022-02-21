const express = require('express');
const router = express.Router()


const { post,put } = require('../controllers/artist');
const { artistValidation } = require('../middlewares/validations/artistValidation');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');


router.post('/item/:id/artist',isAuth,artistValidation,uploadImage,post)
router.put('/item/:id/artist/:artistId',isAuth,artistValidation,uploadImage,put)


module.exports = router;