const express = require('express');
const router = express.Router();
const { createComment, deleteComment, getCommentById, getAllCommentsByArticleId } = require('@/controllers/comment.controller');
const { verifyJWT } = require("@/middlewares/jwt.middleware");


// Create a new comment
router.post('/', verifyJWT, createComment);
// Get all comments for a specific article by articleId
router.get('/', getAllCommentsByArticleId);
// Get a specific comment by ID
router.get('/:id', getCommentById);
// Delete a specific comment by ID
router.delete('/:id', verifyJWT, deleteComment);

module.exports = router;