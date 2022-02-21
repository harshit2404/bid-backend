const express = require('express');
const router = express.Router()


const { post, getAll,getOne,put } = require('../controllers/address');
const { addressValidation } = require('../middlewares/validations/addressValidation');
const { isAuth } = require('../middlewares/validations/isAuth');
const { validateResult } = require('../middlewares/validations/validationResult');



router.post('/address',isAuth,addressValidation,validateResult,post)
router.get('/address',isAuth,getAll)
router.get('/users/:id/address',isAuth,getOne)
router.put('/address/:id',isAuth,addressValidation,validateResult,put)



module.exports = router;