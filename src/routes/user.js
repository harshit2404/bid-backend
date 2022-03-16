const express = require('express');
const router = express.Router()

const { signup, signin, getAll, put,putPassword, getAddress, getArtist,reset,forgot, postImage } = require('../controllers/user');
const { isAuth } = require('../middlewares/validations/isAuth');
const { passwordValidation } = require('../middlewares/validations/passwordValidation');
const { signupValidation } = require('../middlewares/validations/userValidation');
const { validateResult } = require('../middlewares/validations/validationResult');
const { uploadImage } = require('../middlewares/validations/imageUpload');


router.post('/signup',signupValidation,validateResult,signup)
router.post('/signin',signin)
router.get('/users',isAuth,getAll)
router.get('/users/:id',isAuth,getOne)
router.put('/users/:id',isAuth,signupValidation,validateResult,put)
router.put('/user/:id/password',isAuth,passwordValidation,validateResult,putPassword)
router.get('/users/:id/address',isAuth,getAddress)
router.get('/users/:id/artist',getArtist)
router.post('/forgot-password',forgot)
router.post('/reset-password/:id/:token',reset)
router.post('/add-image',isAuth,uploadImage,postImage)




module.exports = router;