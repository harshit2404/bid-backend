const express = require('express');
const router = express.Router()

const { post,put,getCurrent,getItem,getHighest } = require('../controllers/bid');
const { isAuth } = require('../middlewares/validations/isAuth');



router.post('/items/:id/bid',isAuth,post)
router.put('/items/:id/bid',isAuth,put)
router.get('/items/:id/bid',isAuth,getItem)
router.get('/items/:id/bid/current',isAuth,getCurrent)
router.get('/items/:id/bid/highest',isAuth,getHighest)



module.exports = router;