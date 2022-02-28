const express = require('express');

const router = express.Router()


const { post,put,getOne,getAll } = require('../controllers/artist');
const { isAuthorize } = require('../middlewares/permissions/isAuthorize');
const { artistValidation } = require('../middlewares/validations/artistValidation');
const { uploadImage } = require('../middlewares/validations/imageUpload');
const { isAuth } = require('../middlewares/validations/isAuth');
const { validateResult } = require('../middlewares/validations/validationResult');





router.post('/users/:id/artist',isAuth,isAuthorize("MANAGE_ARTIST"),uploadImage,artistValidation,validateResult,post)
router.get('/artists',isAuth,getAll)
router.get('/artist/:id',isAuth,getOne)
router.put('/artist/:id',isAuth,isAuthorize("MANAGE_ARTIST"),uploadImage,artistValidation,validateResult,uploadImage,put)


module.exports = router;