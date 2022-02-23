const express = require('express');
const router = express.Router()

const { post,del } = require('../controllers/following');




router.post("artist/:id/follow",isAuth,post)
router.delete("artist/:id/unfollow",isAuth,del)

module.exports = router;