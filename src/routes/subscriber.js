const express = require('express');
const { isAuth } = require('../middlewares/validations/isAuth');

const {post} = require('../controllers/subscriber');
const router = express.Router()


router.post('/subscribe',isAuth,post)


module.exports = router