const express = require('express');

const router = express.Router()


const { post,put,getOne,getAll, getItems } = require('../controllers/artist');
const { isAuthorize } = require('../middlewares/permissions/isAuthorize');
const { artistValidation } = require('../middlewares/validations/artistValidation');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');
const { validateResult } = require('../middlewares/validations/validationResult');





router.post('/users/:id/artist',isAuth,isAuthorize("MANAGE_ARTIST"),uploadImage,artistValidation,validateResult,post)
router.get('/artists',isAuth,getAll)
router.get('/artists/:id',isAuth,getOne)
router.put('/artists/:id',isAuth,isAuthorize("MANAGE_ARTIST"),uploadImage,artistValidation,validateResult,uploadImage,put)
router.get('/artists/:id/items',isAuth,getItems)

module.exports = router;