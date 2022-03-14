const express = require('express');
const router = express.Router()

const { post,del } = require('../controllers/following');
const { isAuth } = require('../middlewares/validations/isAuth');


router.get('/artists/:id/following',isAuth,get)
router.post("/artists/:id/follow",isAuth,post)
router.delete("/artists/:id/unfollow",isAuth,del)



module.exports = router;