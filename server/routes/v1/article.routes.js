// routes/v1/article.routes.js
const express = require('express');
const router = express.Router();

const {createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle} = require('@/controllers/article.controller');
const { upload, multerErrorHandler } = require('@/middlewares/upload.middleware');
const { verifyTempIdToken } = require('@/middlewares/tempid.middleware');

// Create a new article
router.post('/', upload.single('banner'), multerErrorHandler, verifyTempIdToken, createArticle);

// Get all articles
router.get('/', getAllArticles);

// Get a specific article by ID
router.get('/:id', getArticleById);

// Update a specific article by ID
router.put('/:id', updateArticle);

// Delete a specific article by ID
router.delete('/:id', deleteArticle);

module.exports = router;

