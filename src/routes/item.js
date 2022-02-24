const express = require('express');
const router = express.Router()


const { post,getAll,getOne,getLoggedInUser,put,putAuctionOrSold} = require('../controllers/item');
const { isAuthorize } = require('../middlewares/permissions/isAuthorize');
const { isAuth } = require('../middlewares/validations/isAuth');
const { itemValidation,auctionValidation } = require('../middlewares/validations/itemValidation');
const { validateResult } = require('../middlewares/validations/validationResult');



router.post('/item',isAuth,itemValidation,validateResult,post)
router.get('/item',isAuth,getLoggedInUser)
router.get('/items',isAuth,getAll) 
router.get('/item/:id',isAuth,getOne)
router.put('/item/:id',isAuth,put)
router.put('/item/:id/auction',isAuth,isAuthorize("MANAGE_AUCTION"),auctionValidation,validateResult,putAuctionOrSold)




module.exports = router;