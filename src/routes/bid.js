const express = require('express');
const { post,put,getCurrent,getItem,getHighest } = require('../controllers/bid');
const { isAuth } = require('../middlewares/validations/isAuth');
const router = express.Router()


router.post('/items/:id/bid',isAuth,post)
router.put('/items/:id',isAuth,put)
router.get('items/:id/bid',isAuth,getItem)
router.get('/items/:id/bid/current',isAuth,getCurrent)
router.get('/items/:id/bid/highest',isAuth,getHighest)



module.exports = router;