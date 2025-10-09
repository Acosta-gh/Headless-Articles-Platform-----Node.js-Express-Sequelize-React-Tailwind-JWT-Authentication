
const express = require('express');
const router = express.Router();
const { createComment, deleteComment } = require('@/controllers/comment.controller');

// Create a new comment
router.post('/', createComment);

// Delete a specific comment by ID
router.delete('/:id', deleteComment);

module.exports = router;