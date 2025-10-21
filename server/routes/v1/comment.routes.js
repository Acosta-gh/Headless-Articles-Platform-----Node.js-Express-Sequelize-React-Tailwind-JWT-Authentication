const express = require('express');
const router = express.Router();
const { createComment, deleteComment, getCommentById, getAllCommentsByArticleId } = require('@/controllers/comment.controller');

// Create a new comment
router.post('/', createComment);
// Get all comments for a specific article by articleId 
router.get('/', getAllCommentsByArticleId);
// Get a specific comment by ID
router.get('/:id', getCommentById);
// Delete a specific comment by ID
router.delete('/:id', deleteComment);

module.exports = router;