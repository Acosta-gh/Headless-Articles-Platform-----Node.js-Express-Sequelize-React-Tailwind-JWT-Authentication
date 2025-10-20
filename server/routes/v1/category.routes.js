
const express = require('express');
const router = express.Router();
const { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } = require('@/controllers/category.controller');

// Create a new category
router.post('/', createCategory);
// Delete a specific category by ID
router.delete('/:id', deleteCategory);
// Update a specific category by ID 
router.put('/:id', updateCategory);
// Get all categories
router.get('/', getAllCategories);
// Get a specific category by ID
router.get('/:id', getCategoryById);

module.exports = router;