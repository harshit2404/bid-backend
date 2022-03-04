const express = require('express');
const { post,getAll,del } = require('../controllers/itemFollowing');
const router = express.Router()


router.post('/items/:id/follow',post)
router.get('/items/:id/following',getAll)
router.delete('/items/:id/unfollow',del)


module.exports = router;