const express = require('express');
const router = express.Router();

const { verifyJWT } = require("@/middlewares/jwt.middleware");
const { createLike } = require('@/controllers/like.controller');

// Create and undo a like for a comment or article
router.post('/', verifyJWT, createLike);

module.exports = router;