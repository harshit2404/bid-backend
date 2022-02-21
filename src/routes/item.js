const express = require('express');
const router = express.Router()


const { post,getAll,getOne,del } = require('../controllers/item');
const { isAuth } = require('../middlewares/validations/isAuth');
const { itemValidation } = require('../middlewares/validations/itemValidation');



router.post('/item',isAuth,itemValidation,post)
router.get('/item',isAuth,getAll)
router.get('/item/:id',isAuth,getOne)
router.delete('/item/:id',isAuth,itemValidation,del)




module.exports = router;