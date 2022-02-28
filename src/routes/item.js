const express = require('express');
const router = express.Router()


const { post,getAll,getOne,put,putAuctionOrSold} = require('../controllers/item');
const { isAuthorize } = require('../middlewares/permissions/isAuthorize');
const { isAuth } = require('../middlewares/validations/isAuth');
const { itemValidation,auctionValidation } = require('../middlewares/validations/itemValidation');
const { validateResult } = require('../middlewares/validations/validationResult');
const { uploadImage } = require('../middlewares/validations/imageUpload');


router.post('/items',isAuth,isAuthorize("UPDATE_CREATE_ITEM"),uploadImage,itemValidation,validateResult,post)
router.get('/items',isAuth,getAll) 
router.get('/items/:id',isAuth,getOne)
router.put('/items/:id',isAuth,isAuthorize("UPDATE_CREATE_ITEM"),itemValidation,validateResult,put)
router.put('/items/:id/auction',isAuth,isAuthorize("MANAGE_AUCTION"),auctionValidation,validateResult,putAuctionOrSold)




module.exports = router;