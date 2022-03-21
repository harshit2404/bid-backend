const express = require('express');
const router = express.Router()


const { getAll} = require('../controllers/notification');
const { isAuth } = require('../middlewares/validations/isAuth');

router.get('/notifications',isAuth,getAll)



module.exports = router