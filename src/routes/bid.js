const express = require('express');
const router = express.Router()

const { post,put,getCurrent,getItem,getHighest } = require('../controllers/bid');
const { bidValidation } = require('../middlewares/validations/bidValidation');
const { isAuth } = require('../middlewares/validations/isAuth');
const { validateResult } = require('../middlewares/validations/validationResult');



router.post('/items/:id/bid',isAuth,bidValidation,validateResult,post)
router.put('/items/:id/bid',isAuth,bidValidation,validateResult,put)
router.get('/items/:id/bid',isAuth,getItem)
router.get('/items/:id/bid/current',isAuth,getCurrent)
router.get('/items/:id/bid/highest',isAuth,getHighest)




module.exports = router;