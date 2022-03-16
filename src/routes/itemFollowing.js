const express = require('express');
const { post,getAll,del } = require('../controllers/itemFollowing');
const router = express.Router()

const { isAuth } = require('../middlewares/validations/isAuth');

router.post('/items/:id/follow',isAuth,post)
router.get('/items/:id/following',isAuth,getAll)
router.delete('/items/:id/unfollow',isAuth,del)


module.exports = router;