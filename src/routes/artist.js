const express = require('express');

const router = express.Router()


const { post,put,get,getAll } = require('../controllers/artist');
const { artistValidation } = require('../middlewares/validations/artistValidation');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');
const { validateResult } = require('../middlewares/validations/validationResult');



router.get('/artist',isAuth,get)
router.get('/artists',isAuth,getAll)
router.post('/artist',isAuth,artistValidation,validateResult,uploadImage,post)
router.put('/artist',isAuth,artistValidation,validateResult,uploadImage,put)


module.exports = router;