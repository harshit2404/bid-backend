const express = require('express');
const router = express.Router()


const { post,put,get } = require('../controllers/artist');
const { artistValidation } = require('../middlewares/validations/artistValidation');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');


router.get('/artist',isAuth,get)
router.post('/artist',isAuth,artistValidation,uploadImage,post)
router.put('/artist',isAuth,artistValidation,uploadImage,put)


module.exports = router;