const express = require('express');
const router = express.Router()


const { post,getAll,getOne,getLoggedInUser,put,putAuctionOrSold} = require('../controllers/item');
const { isAuth } = require('../middlewares/validations/isAuth');
const { itemValidation } = require('../middlewares/validations/itemValidation');



router.post('/item',isAuth,itemValidation,post)
router.get('/item',isAuth,getLoggedInUser)
router.get('/items',isAuth,getAll) //admin route
router.get('/item/:id',isAuth,getOne)
router.put('/item/:id',isAuth,put)
router.put('/item/:id',isAuth,putAuctionOrSold)




module.exports = router;