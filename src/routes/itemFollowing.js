const express = require('express');
const { post,getAll,del } = require('../controllers/itemFollowing');
const router = express.Router()


router.post('/item/:id/follow',post)
router.get('/item/:id/following',getAll)
router.delete('/item/:id/unfollow',del)


module.exports = router;